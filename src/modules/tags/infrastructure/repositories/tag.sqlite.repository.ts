import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';
import { TagSqliteEntity } from '../entities/tag.sqlite.entity';
import { TagName } from '../../domain/value-objects/tag-name.value-object';

@Injectable()
export class TagSqliteRepository implements TagRepository {
  constructor(
    @InjectRepository(TagSqliteEntity)
    private readonly ormRepository: Repository<TagSqliteEntity>,
  ) {}

  private mapToDomain(entity: TagSqliteEntity): Tag {
    return Tag.reconstitute(
      entity.id,
      TagName.create(entity.name),
      entity.createdAt,
    );
  }

  private mapToOrm(tag: Tag): TagSqliteEntity {
    const ormEntity = new TagSqliteEntity();
    ormEntity.id = tag.getId();
    ormEntity.name = tag.getName().getValue();
    ormEntity.createdAt = tag.getCreatedAt();
    return ormEntity;
  }

  async save(tag: Tag): Promise<void> {
    const ormEntity = this.mapToOrm(tag);
    await this.ormRepository.save(ormEntity);
  }

  async findById(id: string): Promise<Tag | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async findByName(name: string): Promise<Tag | null> {
    const entity = await this.ormRepository.findOne({ where: { name } });
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async findAll(): Promise<Tag[]> {
    const entities = await this.ormRepository.find();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
