import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Post()
  createOne(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createOne(createCommentDto);
  }
}
