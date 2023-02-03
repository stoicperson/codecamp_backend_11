import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100 })
  airline_name: string;
  @Column({ type: 'char', length: 2 })
  airline_code: string;
}
