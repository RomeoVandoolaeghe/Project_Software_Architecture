import { Injectable } from '@nestjs/common';
import { LoggingService } from '../../../shared/logging/domain/services/logging.service';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class GetPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly loggingService: LoggingService,
  ) {}

  public async execute(tagsQuery?: string): Promise<PostEntity[]> {
    let tagsArray: string[] | undefined = undefined;

    // Si on reçoit "?tags=typescript, nodejs"
    if (tagsQuery) {
      tagsArray = tagsQuery
        .split(',') // On coupe à chaque virgule
        .map((tag) => tag.trim().toLowerCase()) // On enlève les espaces et on force les minuscules
        .filter((tag) => tag.length > 0); // On enlève les tags vides
    }

    // Tu as sûrement déjà de la logique ici pour filtrer les posts ACCEPTED, etc.
    // Laisse ta logique existante et passe simplement "tagsArray" au repository
    const posts = await this.postRepository.getPosts(tagsArray);

    return posts;
  }
}
