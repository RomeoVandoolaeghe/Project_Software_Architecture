import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostCreatedEvent } from '../../domain/events/post-created.event';
import { PostRepository } from '../../domain/repositories/post.repository';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly postRepository: PostRepository,
  ) {}

  public async execute(input: CreatePostDto): Promise<void> {
    const post = PostEntity.create(input.title, input.content, input.authorId);

    await this.postRepository.createPost(post);

    this.eventEmitter.emit(PostCreatedEvent, {
      postId: post.id,
      authorId: input.authorId,
    });
  }
}
