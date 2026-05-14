import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([RolesEntity])],
})
export class RolesModule {}
