import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if(!user) {
      throw new UnauthorizedException("Credenciales incorrectas")
    }
    const passwd = await bcrypt.compare(pass, user.password)
    if (!passwd){
      throw new UnauthorizedException("Credenciales incorrectas")
    }
    if (!user.is_active){
      throw new HttpException("Usuario desactivado", HttpStatus.LOCKED)
    }
    
    //separa password del resto del resultado, asi no se devuelve el password en la respuesta.
    const {password, ... result} = user

    return result;
  }

  async login(user: any) {
    //payload es la informacion que se mete dentro del JWT
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles?.map((role) => role.role_name) ?? [],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
