import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100 })
  airport_name: string;
  @Column({ type: 'char', length: 2 })
  airport_code: string;
  @Column({ type: 'varchar', length: 100 })
  country: string;
  @Column({ type: 'varchar', length: 100 })
  city: string;
}
