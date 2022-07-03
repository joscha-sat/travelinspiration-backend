import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity()
export class Travelpost {
  // ID POST
  @PrimaryGeneratedColumn()
  id: string;

  // USER ID OF CREATOR
  @Column({ nullable: false })
  userId: string;

  // TITEL
  @Column({ nullable: false })
  title: string;

  // BUNDESLAND
  @Column({ nullable: false })
  state: string;

  // ORT IM BUNDESLAND
  @Column({ nullable: false })
  location: string;

  // ART DER REISE (BERGE, STADT...)
  @Column({ nullable: true })
  travelType: string;

  // BESCHREIBUNG
  @Column({ nullable: false })
  description: string;

  // UNTERKUNFT
  @Column({ nullable: true })
  housing: string;

  // GESAMTKOSTEN
  @Column({ nullable: true })
  costsTotal: number;

  // KOSTEN BESCHREIBUNG
  @Column({ nullable: true })
  costDescription: string;

  // SONSTIGES
  @Column({ nullable: true })
  other: string;

  //  IMAGES
  @OneToMany(() => Photo, (photo) => photo.travelpost, {
    cascade: true,
  })
  photos: Photo[];
}
