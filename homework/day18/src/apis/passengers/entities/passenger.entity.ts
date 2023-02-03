import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100 })
  ko_name: string;
  @Column({ type: 'varchar', length: 100 })
  en_first_name: string;
  @Column({ type: 'varchar', length: 100 })
  en_last_name: string;
  @Column({ type: 'char', length: 8 })
  birth_date: string;
  @Column({ type: 'varchar', length: 30 })
  email: string;
  @Column({ type: 'char', length: 11 })
  mobile: string;
  @Column({ type: 'char', length: 1 })
  gender: string;
}
