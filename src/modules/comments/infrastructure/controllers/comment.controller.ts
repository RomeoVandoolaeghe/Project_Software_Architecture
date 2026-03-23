import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AddCommentUseCase } from '../../application/use-cases/add-comment.use-case';
import { GetPostCommentsUseCase } from '../../application/use-cases/get-post-comments.use-case';
import { CreateCommentDto } from '../../application/dtos/create-comment.dto';
import { DeleteCommentUseCase } from '../../application/use-cases/delete-comment.use-case';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly addCommentUseCase: AddCommentUseCase,
    private readonly getPostCommentsUseCase: GetPostCommentsUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
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

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    await this.deleteCommentUseCase.execute(commentId);
  }
}
