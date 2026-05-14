import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { AppointmentsEntity } from 'src/appointments/appointments.entity';

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
 @JoinTable({
  name: 'users_entity_roles_entity',
  joinColumn: { name: 'users_entity_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'roles_entity_id', referencedColumnName: 'id' },
 })
  roles: RolesEntity[];


  @OneToMany(() => AppointmentsEntity, (appointments) => appointments.user)
   @JoinColumn({ name: 'appointment_id' })
    appointments: AppointmentsEntity[];
}
