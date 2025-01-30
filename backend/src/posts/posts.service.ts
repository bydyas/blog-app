import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) { }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne({ where: { id }, relations: ['comments'] });
  }

  async createOne(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);
    const profile = await this.profileRepository.findOneBy({ id: createPostDto.profileId });
    post.profile = profile;
    return this.postsRepository.save(post);
  }

  async removeOne(id: string) {
    const post = await this.postsRepository.findOneBy({ id });
    return this.postsRepository.remove(post);
  }

  async updateOne(updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: updatePostDto.id });
    return this.postsRepository.update(post, updatePostDto);
  }
}
