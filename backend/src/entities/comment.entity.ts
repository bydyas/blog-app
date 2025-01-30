import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Profile } from "./profile.entity"
import { Post } from "./post.entity"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  text: string

  @ManyToOne(() => Profile, (profile) => profile.comments, { eager: true })
  profile: Profile

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post

  @CreateDateColumn()
  createdAt: Date;
}