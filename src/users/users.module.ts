import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { RolesEntity } from 'src/roles/roles.entity';
import { UsersController } from './users.controller';

@Module({
  //en los imports se añade rolesentity para poder tambien consultar los roles desde usersservice.
  imports: [TypeOrmModule.forFeature([UsersEntity, RolesEntity])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
