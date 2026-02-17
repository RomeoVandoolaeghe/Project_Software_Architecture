import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/modules/domain/entities/post.entity';
import { PostRepository } from 'src/modules/domain/repositories/post.repository';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  public execute(input: CreatePostDto) {
    const post = PostEntity.create(input.title, input.content, input.authorId);

    this.postRepository.createPost(post);
  }
}
