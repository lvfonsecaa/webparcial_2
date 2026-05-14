import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles/roles.entity';
import { UsersEntity } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [UsersModule, RolesModule, AppointmentsModule, TypeOrmModule.forRoot({
     type: 'postgres',
     host: process.env.DB_HOST ?? 'localhost',
     port: Number(process.env.DB_PORT ?? 5432),
     username: process.env.DB_USER ?? 'postgres',
     password: process.env.DB_PASS ?? 'postgres',
     database: process.env.DB_NAME ?? 'parcial2',
     entities: [RolesEntity, UsersEntity],
     dropSchema: false,
     synchronize: false,
   }), AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
