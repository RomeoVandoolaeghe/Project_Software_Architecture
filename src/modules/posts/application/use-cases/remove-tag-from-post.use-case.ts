import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import type { TagRepository } from '../../../tags/domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../../tags/domain/repositories/tag.repository';

@Injectable()
export class RemoveTagFromPostUseCase {
  constructor(
    // @Inject('PostRepository')
    private readonly postRepository: PostRepository,

    @Inject(TAG_REPOSITORY_TOKEN)
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(
    postId: string,
    tagId: string,
    userId: string,
    isAdmin: boolean,
  ): Promise<void> {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException(
        `Le post avec l'ID '${postId}' n'existe pas.`,
      );
    }

    const authorId = post.getAuthorId();
    if (authorId !== userId && !isAdmin) {
      throw new ForbiddenException(
        "Vous n'avez pas l'autorisation de retirer un tag de ce post.",
      );
    }

    const tag = await this.tagRepository.findById(tagId);
    if (!tag) {
      throw new NotFoundException(`Le tag avec l'ID '${tagId}' n'existe pas.`);
    }

    const existingTags = post.getTags();
    const hasTag = existingTags.some((t) => t.getId() === tagId);
    if (!hasTag) {
      throw new NotFoundException(
        "L'association entre ce post et ce tag n'existe pas.",
      );
    }

    post.removeTag(tagId);
    await this.postRepository.updatePost(postId, post);
  }
}
