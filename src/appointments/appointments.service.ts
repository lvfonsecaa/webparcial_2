import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppointmentsEntity } from './appointments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AppointmentsService {
     constructor(
       @InjectRepository(AppointmentsEntity)
       private readonly appointmentsRepository: Repository<AppointmentsEntity>,

       @InjectRepository(UsersEntity)
         private readonly usersRepository: Repository<UsersEntity>
   ){}

    async create(id_usuario: string, id_doctor: string, motivo: string[], datetime: Date): Promise <void> {
        if(!motivo || motivo.length === 0 ){
          throw new BadRequestException("la cita debe incluir un motivo")
        }
    
        const user = await this.usersRepository.findOne({
          where: {id: id_usuario},
          relations:{roles:true},
        });

        const doctor = await this.usersRepository.findOne({
          where: {id: id_doctor},
          relations:{roles:true},
        });

        if(!user){
          throw new NotFoundException("Usuario no encontrado")
        }

    
        if(!doctor){
          throw new NotFoundException("Doctor no encontrado")
        }

        const appointment = this.appointmentsRepository.create({
          da
        });

        await this.appointmentsRepository.save(appointment);
      }

    async findAll(): Promise<AppointmentsEntity[]> {
        try {
          return await this.appointmentsRepository.find();
        } catch {
          throw new InternalServerErrorException("Error al obtener citas");
        }
    }


    async editar(): Promise<AppointmentsEntity[]> {
        try {
          return await this.appointmentsRepository.find();
        } catch {
          throw new InternalServerErrorException("Error al obtener citas");
        }
    }

}
