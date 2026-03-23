import { Module } from '@nestjs/common';
import { CommentController } from './infrastructure/controllers/comment.controller';
import { AddCommentUseCase } from './application/use-cases/add-comment.use-case';
import { GetPostCommentsUseCase } from './application/use-cases/get-post-comments.use-case';
import { CommentRepository } from './domain/repositories/comment.repository';
import { SQLiteCommentRepository } from './infrastructure/repositories/comment.sqlite.repository';
import { PostRepository } from '../posts/domain/repositories/post.repository';
import { SQLitePostRepository } from '../posts/infrastructure/repositories/post.sqlite.repository';
import { DeleteCommentUseCase } from './application/use-cases/delete-comment.use-case';

@Module({
  controllers: [CommentController],
  providers: [
    AddCommentUseCase,
    GetPostCommentsUseCase,
    DeleteCommentUseCase,
    {
      provide: CommentRepository,
      useClass: SQLiteCommentRepository,
    },
    {
      provide: PostRepository,
      useClass: SQLitePostRepository,
    },
  ],
})
export class CommentModule {}
