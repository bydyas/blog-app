import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Post } from "./post.entity"
import { Comment } from "./comment.entity"

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

  @OneToMany(() => Comment, (comment) => comment.profile, { cascade: true })
  comments: Comment[]
}