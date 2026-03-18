import { Injectable, Inject } from '@nestjs/common';
import type { TagRepository } from '../../domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';

@Injectable()
export class ListTagsUseCase {
  constructor(
    @Inject(TAG_REPOSITORY_TOKEN)
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }
}
