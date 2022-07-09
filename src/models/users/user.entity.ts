import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Travelpost } from '../travelpost/travelpost.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @ManyToMany(() => Travelpost, { cascade: true, onUpdate: 'CASCADE' })
  @JoinTable()
  favouriteList: Travelpost[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
