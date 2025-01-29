import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { RemovePostDto } from './dtos/remove-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }) {
    return this.postsService.findOne(params.id);
  }

  @Post()
  createOne(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createOne(createPostDto);
  }

  @Delete(':id')
  removeOne(@Param() removePostDto: RemovePostDto) {
    return this.postsService.removeOne(removePostDto.id);
  }

  @Patch(':id')
  updateOne(@Param() updatePostDto: UpdatePostDto) {
    return this.postsService.updateOne(updatePostDto);
  }
}
