import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller()
export class RolesController{
    constructor(
        private rolesService: RolesService,
    ){}
    //@roles guarda el metadata, diciendo que ele endpoint necesita el rol admin
    @Roles('admin')
    //useguards es la validacion para entrar al endpoint
    //el jwtguard mira si esta loggeado
    //rolesguard mira si el rol loggeado tiene el rol necesario para entrar al endpoint
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('roles')
    async create(@Body() role: CreateRoleDto){
        const createdRole = await this.rolesService.create(role)
        return {
            message: "Rol creado con éxito",
            roleId: createdRole.id,
        }
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('roles')
    async findAll(){
        return this.rolesService.findAll()
    }

}
