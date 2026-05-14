import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  //cada elemento dentro de roles debe ser string
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles: string[];
}
