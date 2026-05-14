import { Controller, Post, Body, UseGuards } from "@nestjs/common";
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

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('roles')
    async create(@Body() role: CreateRoleDto){
        const createdRole = await this.rolesService.create(role)
        return {
            message: "Rol creado con éxito",
            roleId: createdRole.id,
        }
    }

}
