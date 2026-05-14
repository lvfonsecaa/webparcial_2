import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException,} from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegistroDto } from './dto/registro.dto';
import { RolesEntity } from 'src/roles/roles.entity';


export type User = any;

@Injectable()
export class UsersService {
     constructor(
       @InjectRepository(UsersEntity)
       private readonly usersRepository: Repository<UsersEntity>,
      
       //para acceder a los roles
       @InjectRepository(RolesEntity)
       private readonly rolesRepository: Repository<RolesEntity>
){}

   /** 
   private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    }, 
  ];
*/

  async findOne(email: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOne({
      where: {email},
      //le dice a typeorm que cawgue tambien sus relaciones. 
      relations: {roles: true},
    });
  }

  async create(user: RegistroDto): Promise<UsersEntity> {
      if (!user.email.includes("@")){
         throw new BadRequestException("Email invalido");
      }

      const existe = await this.findOne(user.email)
      if (existe){
        throw new ConflictException("Email ya registrado")
      }

      const nuevoUsuario = this.usersRepository.create({
        ...user,
        //la contraseña se guarda como hash y no como texto
        //el segundo parametro es el costo del hash 
        password: await bcrypt.hash(user.password, 10),
      });
       
      return this.usersRepository.save(nuevoUsuario);
  }

  async assignRole(id: string, role_names: string[]): Promise <void> {
    if(!Array.isArray(role_names) || role_names.length === 0 ){
      throw new BadRequestException("roles inválidos")
    }

    const user = await this.usersRepository.findOne({
      where: {id},
      relations:{roles:true},
    });

    if(!user){
      throw new NotFoundException("Usuario no encontrado")
    }

    const roles = await this.rolesRepository.find({
      where: {role_name: In(role_names)}
    })

    if (roles.length !== role_names.length) {
      throw new BadRequestException("roles inválidos");
    }
    user.roles = roles;
    await this.usersRepository.save(user);
  }

  async findAll(): Promise<UsersEntity[]>{
    try {
      return await this.usersRepository.find({relations: {roles: true}});
    } catch (error) {
      throw new InternalServerErrorException ("Error al listar usuarios")
    }

  }
}
