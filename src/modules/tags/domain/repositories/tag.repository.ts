import { Tag } from '../entities/tag.entity';

export const TAG_REPOSITORY_TOKEN = Symbol('TAG_REPOSITORY_TOKEN');

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findById(id: string): Promise<Tag | null>;
  findByName(name: string): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  delete(id: string): Promise<void>;
}
