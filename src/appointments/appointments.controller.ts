import { Controller, Post, Body, UseGuards, Get, Param, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AppointmentsService } from "./appointments.service";

@Controller()
export class AppointmentsController{
    constructor(
        private appointmentsService: AppointmentsService,
    ){}

    @Roles('user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('appointments/:id_doctor')
    async create(@Param('id_doctor') id_doctor: string, @Body() appointment: CreateAppointmentDto){
        return {
            message: "Cita creada con éxito",
        }
    }

    @Roles('doctor, admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('appointments')
    async findAll(){
        return this.appointmentsService.findAll()
    }

    @Roles('doctor')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('appointments')
    async patch(){
        return this.appointmentsService.editar()
    }



}
