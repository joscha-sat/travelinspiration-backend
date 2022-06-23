import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Travelpost } from '../travelpost/travelpost.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne('Travelpost', (travelpost: Travelpost) => travelpost.photos)
  travelpost: Travelpost;
}
