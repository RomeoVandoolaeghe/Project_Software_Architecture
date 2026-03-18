import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { TagRepository } from '../../domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../domain/repositories/tag.repository';

@Injectable()
export class DeleteTagUseCase {
  constructor(
    @Inject(TAG_REPOSITORY_TOKEN)
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`Le tag avec l'ID '${id}' n'existe pas.`);
    }
    await this.tagRepository.delete(id);
  }
}
