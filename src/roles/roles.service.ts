import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { RolesEntity } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
     constructor(
       @InjectRepository(RolesEntity)
       private readonly rolesRepository: Repository<RolesEntity>
   ){}

    async create(role: CreateRoleDto): Promise<RolesEntity> {
        if (!role.role_name || role.role_name.trim() === ''){
          throw new BadRequestException("role_name es requerido");
        }

        //equivalente a SELECT * FROM roles WHERE role_name = 'admin' LIMIT 1;
        const existe = await this.rolesRepository.findOne({
          where: {role_name: role.role_name},
        })

        if (existe){
          throw new ConflictException("role_name ya existe")
        }

        const nuevoRol = this.rolesRepository.create(role)
        return this.rolesRepository.save(nuevoRol);
    }

    async findAll(): Promise<RolesEntity[]> {
        return await this.rolesRepository.find();
    }

}
