import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../../domain/repositories/comment.repository';

@Injectable()
export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(commentId: string): Promise<void> {
    // On appelle simplement la méthode de suppression de notre repository
    await this.commentRepository.deleteComment(commentId);
  }
}
