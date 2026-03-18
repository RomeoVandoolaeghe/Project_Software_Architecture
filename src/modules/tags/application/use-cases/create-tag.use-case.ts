import { Injectable, Inject, ConflictException } from '@nestjs/common';
import type { TagRepository } from '../../domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../domain/repositories/tag.repository';
import { TagName } from '../../domain/value-objects/tag-name.value-object';
import { Tag } from '../../domain/entities/tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class CreateTagUseCase {
  constructor(
    @Inject(TAG_REPOSITORY_TOKEN)
    private readonly tagRepository: TagRepository,
  ) {}
  async execute(dto: CreateTagDto): Promise<Tag> {
    const normalizedName = dto.name.trim().toLowerCase();
    const existingTag = await this.tagRepository.findByName(normalizedName);
    if (existingTag) {
      throw new ConflictException(`Le tag '${normalizedName}' existe deja.`);
    }
    const tagName = TagName.create(normalizedName);
    const tag = Tag.create(tagName);
    await this.tagRepository.save(tag);
    return tag;
  }
}
