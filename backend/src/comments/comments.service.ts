import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Profile } from 'src/entities/profile.entity';
import { Post } from 'src/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  async createOne(createCommentDto: CreateCommentDto) {
    const comment = this.commentsRepository.create(createCommentDto);
    const post = await this.postsRepository.findOneBy({ id: createCommentDto.postId });
    const profile = await this.profilesRepository.findOneBy({ id: createCommentDto.profileId });
    comment.post = post;
    comment.profile = profile;
    return this.commentsRepository.save(comment);
  }
}
