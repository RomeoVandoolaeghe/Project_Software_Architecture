import { Injectable } from '@nestjs/common';
import { PostEntity } from '../domain/entities/post.entity';
import { PostRepository } from '../domain/repositories/post.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public getPosts() {
    const posts = this.postRepository.getPosts();

    console.log(posts);

    return posts;
  }

  public getPostById(id: string) {
    return this.postRepository.getPostById(id);
  }

  public createPost(input: CreatePostDto) {
    const newPost = PostEntity.create(
      input.title,
      input.content,
      input.authorId,
    );

    return this.postRepository.createPost(newPost);
  }

  public updatePost(id: string, input: UpdatePostDto) {
    const post = this.postRepository.getPostById(id);

    if (post) {
      post.update(input.title, input.content);
      return this.postRepository.updatePost(id, post);
    }
  }

  public deletePost(id: string) {
    return this.postRepository.deletePost(id);
  }
}
