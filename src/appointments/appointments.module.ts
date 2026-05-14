import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsEntity } from './appointments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([AppointmentsEntity])],
})
export class AppointmentsModule {}
