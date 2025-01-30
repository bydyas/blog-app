import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Profile } from "./profile.entity"
import { Comment } from "./comment.entity"

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column()
  previewSrc: string

  @Column()
  body: string

  @ManyToOne(() => Profile, (profile) => profile.posts, { eager: true })
  profile: Profile

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}