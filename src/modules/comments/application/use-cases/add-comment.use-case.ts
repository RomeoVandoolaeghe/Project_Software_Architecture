import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from '../../domain/entities/comment.entity';
import { CommentRepository } from '../../domain/repositories/comment.repository';
import { PostRepository } from '../../../posts/domain/repositories/post.repository';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Injectable()
export class AddCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(postId: string, input: CreateCommentDto): Promise<void> {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException(
        `L'article avec l'ID ${postId} n'existe pas.`,
      );
    }

    const comment = CommentEntity.create(input.content, input.authorId, postId);

    await this.commentRepository.createComment(comment);
  }
}
