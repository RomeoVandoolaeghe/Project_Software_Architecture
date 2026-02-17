import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/modules/shared/logging/domain/services/logging.service';
import { PostRepository } from '../../domain/repositories/post.repository';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly loggingService: LoggingService,
  ) {}

  public execute(id: string, input: UpdatePostDto) {
    this.loggingService.log('UpdatePostUseCase.execute');
    const post = this.postRepository.getPostById(id);

    if (post) {
      post.update(input.title, input.content);
      this.postRepository.updatePost(id, post);
    }
  }
}
