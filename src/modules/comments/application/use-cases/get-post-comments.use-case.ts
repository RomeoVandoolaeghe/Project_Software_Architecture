import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../../domain/repositories/comment.repository';

@Injectable()
export class GetPostCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(postId: string) {
    const comments = await this.commentRepository.getCommentsByPostId(postId);
    return comments.map((comment) => comment.toJSON());
  }
}
