import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/modules/shared/logging/domain/services/logging.service';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class GetPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly loggingService: LoggingService,
  ) {}

  public execute() {
    this.loggingService.log('GetPostsUseCase.execute');
    return this.postRepository.getPosts();
  }
}
