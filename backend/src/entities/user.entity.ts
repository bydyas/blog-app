import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile
}
