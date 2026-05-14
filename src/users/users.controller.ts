import { Body, Controller, Param, Patch, UseGuards, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "src/auth/roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { AssignRolesDto } from "./dto/assign-roles.dto";
@Controller()
export class UsersController{
    constructor(
        private usersService: UsersService,
    ){}

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('users/:id/roles')
    async assignRole (@Param('id') id: string, @Body() body: AssignRolesDto){
        await this.usersService.assignRole(id, body.roles)
        return{
            message: 'Roles asignados',
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("users")
    async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles.map((role) => role.role_name),
    }));
    }

}