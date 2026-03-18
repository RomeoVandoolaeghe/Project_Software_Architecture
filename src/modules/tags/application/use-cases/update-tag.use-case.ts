import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import type { TagRepository } from '../../domain/repositories/tag.repository';
import { TAG_REPOSITORY_TOKEN } from '../../domain/repositories/tag.repository';
import { TagName } from '../../domain/value-objects/tag-name.value-object';
import { Tag } from '../../domain/entities/tag.entity';
import { UpdateTagDto } from '../dtos/update-tag.dto';

@Injectable()
export class UpdateTagUseCase {
  constructor(
    @Inject(TAG_REPOSITORY_TOKEN)
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(id: string, dto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`Le tag avec l'ID '${id}' n'existe pas.`);
    }

    const normalizedName = dto.name.trim().toLowerCase();

    const existingTag = await this.tagRepository.findByName(normalizedName);
    if (existingTag && existingTag.getId() !== id) {
      throw new ConflictException(`Le tag '${normalizedName}' existe déjà.`);
    }

    const newTagName = TagName.create(normalizedName);
    tag.updateName(newTagName);

    await this.tagRepository.save(tag);
    return tag;
  }
}
