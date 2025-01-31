import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Profile } from 'src/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Profile])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule { }
