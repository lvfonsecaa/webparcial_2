import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class AppointmentsEntity {
 @PrimaryGeneratedColumn('uuid')
  id: string;

 @Column()
  name: string;

 @Column({type: 'timestamp'})
  datetime: string;

 @Column({enum: {pending: 'pending', canceled: 'canceled', done: 'done'}})
  status: string;

 @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @Column()
   motivo: string;

//para la relacion con los appointments
 @ManyToOne(() => UsersEntity, (user) => user.appointments)
 @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

 @ManyToOne(() => UsersEntity, (doctor) => doctor.appointments)
 @JoinColumn({ name: 'doctor_id' })
  doctor: UsersEntity;
}
