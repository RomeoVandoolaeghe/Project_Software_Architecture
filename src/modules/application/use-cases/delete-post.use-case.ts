import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/modules/domain/repositories/post.repository';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public execute(id: string) {
    this.postRepository.deletePost(id);
  }
}
