import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/modules/domain/repositories/post.repository';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public execute(id: string, input: UpdatePostDto) {
    const post = this.postRepository.getPostById(id);

    if (post) {
      post.update(input.title, input.content);
      this.postRepository.updatePost(id, post);
    }
  }
}
