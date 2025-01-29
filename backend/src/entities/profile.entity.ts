import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Post } from "./post.entity"

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToMany(() => Post, (post) => post.profile, { cascade: true })
  posts: Post[]
}