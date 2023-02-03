import { Airline } from '../../airlines/entities/airlines.entity';
import { Airport } from '../../airports/entities/airport.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'timestamp' })
  arriving_time: Date;
  @Column({ type: 'timestamp' })
  departing_time: Date;
  @Column({ type: 'varchar', length: 10 })
  arriving_gate: string;
  @Column({ type: 'varchar', length: 10 })
  departing_gate: string;
  @Column({ type: 'char', length: 11 })
  ticket_num: string;
  @Column({ type: 'varchar', length: 100 })
  ticket_image: string;
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Column({ type: 'tinyint' })
  travel_class: number;
  @Column({ type: 'int' })
  limit_count: number;
  @Column({ type: 'int' })
  price: number;
  @ManyToOne(() => Airport)
  departing_airport: Airport;
  @ManyToOne(() => Airport)
  arriving_airport: Airport;
  @ManyToOne(() => Airline)
  airline: Airline;
}
