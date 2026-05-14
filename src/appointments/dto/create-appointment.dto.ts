import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsNotEmpty()
  datetime: Timestamp;

}
