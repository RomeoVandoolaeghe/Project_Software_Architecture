import { Injectable } from '@nestjs/common';
import { PostRepository } from '../domain/repositories/post.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public getPosts() {
    return this.postRepository.getPosts();
  }

  public getPostById(id: string) {
    return this.postRepository.getPostById(id);
  }

  public createPost(input: CreatePostDto) {
    return this.postRepository.createPost({
      ...input,
      status: 'draft',
    });
  }

  public updatePost(id: string, input: UpdatePostDto) {
    return this.postRepository.updatePost(id, input);
  }

  public deletePost(id: string) {
    return this.postRepository.deletePost(id);
  }
}
