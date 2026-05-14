import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';

@Entity()
export class UsersEntity {
 @PrimaryGeneratedColumn('uuid')
  id: string;

 @Column({unique: true})
  email: string;
 //hash?
 @Column()
  password: string;

 @Column()
  name: string;
 @Column({ nullable: true })
  phone: string;

 @Column({default: true})
  is_active: boolean;
 // default: now????
 @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

//para la relacion con los roles
 @ManyToMany(() => RolesEntity, (role) => role.users)
 @JoinTable()
  roles: RolesEntity[];
}
