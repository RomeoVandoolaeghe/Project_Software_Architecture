import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/modules/shared/logging/domain/services/logging.service';
import { PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class GetPostByIdUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly loggingService: LoggingService,
  ) {}

  public execute(id: string) {
    this.loggingService.log('GetPostByIdUseCase.execute');
    return this.postRepository.getPostById(id);
  }
}
