import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/modules/shared/logging/domain/services/logging.service';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly loggingService: LoggingService,
  ) {}

  public execute(input: CreatePostDto) {
    this.loggingService.log('CreatePostUseCase.execute');

    const post = PostEntity.create(input.title, input.content, input.authorId);

    this.postRepository.createPost(post);
  }
}
