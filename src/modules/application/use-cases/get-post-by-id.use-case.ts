import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/modules/domain/repositories/post.repository';

@Injectable()
export class GetPostByIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public execute(id: string) {
    return this.postRepository.getPostById(id);
  }
}
