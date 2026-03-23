import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class GetPostBySlugUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public async execute(slug: string) {
    const post = await this.postRepository.getPostBySlug(slug);

    if (!post) {
      throw new NotFoundException(
        `Le post avec le slug "${slug}" n'a pas été trouvé.`,
      );
    }

    return post.toJSON();
  }
}
