import { v4 } from 'uuid';
import { PostContent } from '../value-objects/post-content.value-object';
import { PostTitle } from '../value-objects/post-title.value-object';
import { PostSlug } from '../value-objects/post-slug.value-object';
import { Tag } from '../../../tags/domain/entities/tag.entity';

export type PostStatus = 'draft' | 'waiting' | 'accepted' | 'rejected';

export class PostEntity {
  private _title: PostTitle;
  private _content: PostContent;
  private _slug: PostSlug;
  private readonly _authorId: string;
  private readonly _status: PostStatus;
  private _tags: Tag[];

  private constructor(
    readonly id: string,
    title: PostTitle,
    content: PostContent,
    slug: PostSlug,
    authorId: string,
    status: PostStatus,
    tags: Tag[] = [],
  ) {
    this._title = title;
    this._content = content;
    this._slug = slug;
    this._authorId = authorId;
    this._status = status;
    this._tags = tags;
  }

  public get slug(): string {
    return this._slug.getValue();
  }

  public static reconstitute(input: Record<string, unknown>) {
    return new PostEntity(
      input.id as string,
      new PostTitle(input.title as string),
      new PostContent(input.content as string),
      PostSlug.reconstitute(input.slug as string),
      input.authorId as string,
      input.status as PostStatus,
      (input.tags as Tag[]) || [],
    );
  }

  public static create(
    title: string,
    content: string,
    authorId: string,
  ): PostEntity {
    return new PostEntity(
      v4(),
      new PostTitle(title),
      new PostContent(content),
      PostSlug.create(title),
      authorId,
      'draft',
      [],
    );
  }

  public update(title?: string, content?: string) {
    if (title) {
      this._title = new PostTitle(title);
      this._slug = PostSlug.create(title);
    }

    if (content) {
      this._content = new PostContent(content);
    }
  }

  public getTags(): Tag[] {
    return this._tags;
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      title: this._title.toString(),
      slug: this._slug.getValue(),
      content: this._content.toString(),
      status: this._status,
      authorId: this._authorId,
      tags: this.getTags(),
    };
  }

  public get status(): PostStatus {
    return this._status;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public getAuthorId(): string {
    return this._authorId;
  }

  public addTag(newTag: Tag): void {
    if (!this._tags) this._tags = [];
    const alreadyExists = this._tags.some(
      (tag) => tag.getId() === newTag.getId(),
    );
    if (!alreadyExists) {
      this._tags.push(newTag);
    }
  }

  public removeTag(tagIdToRemove: string): void {
    if (!this._tags) return;
    this._tags = this._tags.filter((tag) => tag.getId() !== tagIdToRemove);
  }
}
