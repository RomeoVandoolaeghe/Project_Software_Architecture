import { Injectable } from '@nestjs/common';
import {
  CreatePostModel,
  PostModel,
  PostRepository,
  UpdatePostModel,
} from 'src/modules/domain/repositories/post.repository';
import { v4 } from 'uuid';

@Injectable()
export class InMemoryPostRepository implements PostRepository {
  private posts: PostModel[] = [];

  public getPosts(): PostModel[] {
    console.log('InMemoryPostRepository.getPosts');
    return this.posts;
  }

  public getPostById(id: string) {
    return this.posts.find((post) => post.id === id);
  }

  public createPost(input: CreatePostModel) {
    this.posts.push({
      ...input,
      id: v4(),
    });
  }

  public updatePost(id: string, input: UpdatePostModel) {
    this.posts = this.posts.map((post) => {
      if (post.id !== id) {
        return post;
      }

      return {
        ...post,
        ...input,
      };
    });
  }

  public deletePost(id: string) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
