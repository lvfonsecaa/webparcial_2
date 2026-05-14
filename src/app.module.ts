import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles/roles.entity';
import { UsersEntity } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, RolesModule, TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'parcial2',
     entities: [RolesEntity, UsersEntity],
     dropSchema: true,
     synchronize: true,
   }), AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
