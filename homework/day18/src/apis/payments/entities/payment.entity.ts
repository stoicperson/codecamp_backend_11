import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Passenger } from 'src/apis/passengers/entities/passenger.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'char', length: 14 })
  trans_num: string;
  @Column({ type: 'tinyint' })
  trans_status: number;
  @Column({ type: 'timestamp' })
  created_at: Date;
  @ManyToOne(() => Ticket)
  ticket: Ticket;
  @ManyToOne(() => User)
  user: User;
  @JoinColumn()
  @OneToOne(() => Passenger)
  passenger: Passenger;
}
