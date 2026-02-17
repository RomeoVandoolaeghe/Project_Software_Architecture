import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/modules/domain/repositories/post.repository';

@Injectable()
export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public execute() {
    return this.postRepository.getPosts();
  }
}
