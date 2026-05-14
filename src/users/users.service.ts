import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegistroDto } from './dto/registro.dto';


export type User = any;

@Injectable()
export class UsersService {
     constructor(
       @InjectRepository(UsersEntity)
       private readonly usersRepository: Repository<UsersEntity>
   ){}

   /** 
   private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    }, 
  ];
*/

  async findOne(email: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOne({
      where: {email},
      //le dice a typeorm que cawgue tambien sus relaciones. 
      relations: {roles: true},
    });
  }

  async create(user: RegistroDto): Promise<UsersEntity> {
      if (!user.email.includes("@")){
         throw new BadRequestException("Email invalido");
      }

      const existe = await this.findOne(user.email)
      if (existe){
        throw new ConflictException("Email ya registrado")
      }

      const nuevoUsuario = this.usersRepository.create({
        ...user,
        //la contraseña se guarda como hash y no como texto
        //el segundo parametro es el costo del hash 
        password: await bcrypt.hash(user.password, 10),
      });
       
      return this.usersRepository.save(nuevoUsuario);
  }
}
