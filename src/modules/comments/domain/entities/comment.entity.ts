import { v4 } from 'uuid';
import { CommentContent } from '../value-objects/comment-content.value-object';

export class CommentEntity {
  private _content: CommentContent;
  private readonly _authorId: string;
  private readonly _postId: string;
  private readonly _createdAt: Date;

  private constructor(
    readonly id: string,
    content: CommentContent,
    authorId: string,
    postId: string,
    createdAt: Date,
  ) {
    this._content = content;
    this._authorId = authorId;
    this._postId = postId;
    this._createdAt = createdAt;
  }

  public get content(): string {
    return this._content.getValue();
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get postId(): string {
    return this._postId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public static create(
    content: string,
    authorId: string,
    postId: string,
  ): CommentEntity {
    return new CommentEntity(
      v4(),
      new CommentContent(content),
      authorId,
      postId,
      new Date(),
    );
  }

  public static reconstitute(input: Record<string, unknown>): CommentEntity {
    return new CommentEntity(
      input.id as string,
      new CommentContent(input.content as string),
      input.authorId as string,
      input.postId as string,
      new Date(input.createdAt as string | Date),
    );
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      content: this.content,
      authorId: this.authorId,
      postId: this.postId,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
