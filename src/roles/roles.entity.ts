import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity('roles')
export class RolesEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({unique: true})
 role_name: string;

 @Column({ nullable: true })
 description: string;

 @ManyToMany(() => UsersEntity, (user) => user.roles)
 users: UsersEntity[];
}
