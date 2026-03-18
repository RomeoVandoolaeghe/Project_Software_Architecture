import { randomUUID } from 'crypto';
import { TagName } from '../value-objects/tag-name.value-object';

export class Tag {
  private readonly id: string;
  private name: TagName;
  private readonly createdAt: Date;

  private constructor(id: string, name: TagName, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  public static create(name: TagName): Tag {
    return new Tag(randomUUID(), name, new Date());
  }

  public static reconstitute(id: string, name: TagName, createdAt: Date): Tag {
    return new Tag(id, name, createdAt);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): TagName {
    return this.name;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public updateName(newName: TagName): void {
    this.name = newName;
  }
}
