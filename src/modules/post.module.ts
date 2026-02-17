import { Module } from '@nestjs/common';
import { PostService } from './application/post.service';
import { PostRepository } from './domain/repositories/post.repository';
import { PostController } from './infrastructure/controllers/post.controller';
import { InMemoryPostRepository } from './infrastructure/repositories/post.in-memory.repository';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: PostRepository,
      useClass: InMemoryPostRepository,
    },
    PostService,
  ],
})
export class PostModule {}
