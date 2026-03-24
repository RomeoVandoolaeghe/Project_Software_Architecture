import { v4 } from 'uuid';

export class SubscriptionEntity {
  private readonly _subscriberId: string;
  private readonly _authorId: string;
  private readonly _createdAt: Date;

  private constructor(
    readonly id: string,
    subscriberId: string,
    authorId: string,
    createdAt: Date,
  ) {
    this._subscriberId = subscriberId;
    this._authorId = authorId;
    this._createdAt = createdAt;
  }

  public get subscriberId(): string {
    return this._subscriberId;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public static create(
    subscriberId: string,
    authorId: string,
  ): SubscriptionEntity {
    return new SubscriptionEntity(v4(), subscriberId, authorId, new Date());
  }

  public static reconstitute(
    input: Record<string, unknown>,
  ): SubscriptionEntity {
    return new SubscriptionEntity(
      input.id as string,
      input.subscriberId as string,
      input.authorId as string,
      new Date(input.createdAt as string | Date),
    );
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      subscriberId: this.subscriberId,
      authorId: this.authorId,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
