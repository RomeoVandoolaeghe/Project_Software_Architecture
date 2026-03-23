import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AddCommentUseCase } from '../../application/use-cases/add-comment.use-case';
import { GetPostCommentsUseCase } from '../../application/use-cases/get-post-comments.use-case';
import { CreateCommentDto } from '../../application/dtos/create-comment.dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly addCommentUseCase: AddCommentUseCase,
    private readonly getPostCommentsUseCase: GetPostCommentsUseCase,
  ) {}

  @Post()
  async addComment(
    @Param('postId') postId: string,
    @Body() input: CreateCommentDto,
  ) {
    await this.addCommentUseCase.execute(postId, input);
  }

  @Get()
  async getComments(@Param('postId') postId: string) {
    return this.getPostCommentsUseCase.execute(postId);
  }
}
