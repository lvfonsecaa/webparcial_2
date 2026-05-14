import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { RegistroDto } from "src/users/dto/registro.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController{
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ){}

    @Post('auth/register')
    async register (@Body() user: RegistroDto){
        const userCreado = await this.usersService.create(user)

        return{
            message: 'Usuario registrado con éxito',
            userId: userCreado.id,
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}