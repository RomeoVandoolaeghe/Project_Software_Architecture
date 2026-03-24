import { v4 } from 'uuid';

export class NotificationEntity {
  private readonly _userId: string;
  private readonly _message: string;
  private _isRead: boolean;
  private readonly _createdAt: Date;

  private constructor(
    readonly id: string,
    userId: string,
    message: string,
    isRead: boolean,
    createdAt: Date,
  ) {
    this._userId = userId;
    this._message = message;
    this._isRead = isRead;
    this._createdAt = createdAt;
  }

  public get userId(): string {
    return this._userId;
  }
  public get message(): string {
    return this._message;
  }
  public get isRead(): boolean {
    return this._isRead;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }

  public markAsRead(): void {
    this._isRead = true;
  }

  public static create(userId: string, message: string): NotificationEntity {
    return new NotificationEntity(v4(), userId, message, false, new Date());
  }

  public static reconstitute(
    input: Record<string, unknown>,
  ): NotificationEntity {
    return new NotificationEntity(
      input.id as string,
      input.userId as string,
      input.message as string,
      !!input.isRead,
      new Date(input.createdAt as string | Date),
    );
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      userId: this.userId,
      message: this.message,
      isRead: this.isRead,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
