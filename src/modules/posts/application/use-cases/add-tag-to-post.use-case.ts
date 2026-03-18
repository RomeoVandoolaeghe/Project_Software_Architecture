import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
// On importe le token et l'interface depuis le module Tags
import type { TagRepository } from '../../../tags/domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../../tags/domain/repositories/tag.repository';

@Injectable()
export class AddTagToPostUseCase {
  constructor(
    // Adapte l'injection de PostRepository selon comment tu l'as configuré dans ton PostModule
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
  ): Promise<PostEntity> {
    // 1. Récupérer le post
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException(
        `Le post avec l'ID '${postId}' n'existe pas.`,
      );
    }

    // 2. Vérification de l'autorisation (Seul l'auteur ou un ADMIN peut modifier)
    // /!\ Modifie "post.authorId" selon le nom exact de la propriété ou du getter dans ton PostEntity
    // Remplacer : const authorId = post['authorId'] || post['author']?.id;
    // Par ceci :
    const authorId = post.getAuthorId();
    if (authorId !== userId && !isAdmin) {
      throw new ForbiddenException(
        "Vous n'avez pas l'autorisation d'ajouter un tag à ce post.",
      );
    }

    // 3. Récupérer le tag
    const tag = await this.tagRepository.findById(tagId);
    if (!tag) {
      throw new NotFoundException(`Le tag avec l'ID '${tagId}' n'existe pas.`);
    }

    // 4. Règle métier : Vérifier si le tag est déjà présent (pour renvoyer une erreur 409 Conflict)
    const existingTags = post.getTags();
    const alreadyHasTag = existingTags.some((t) => t.getId() === tag.getId());
    if (alreadyHasTag) {
      throw new ConflictException('Ce tag est déjà associé à ce post.');
    }

    // 5. Ajouter le tag et sauvegarder
    post.addTag(tag);
    await this.postRepository.updatePost(postId, post);

    return post;
  }
}
