import { NotificationEntity } from '../entities/notification.entity';

export abstract class NotificationRepository {
  public abstract createNotification(
    notification: NotificationEntity,
  ): Promise<void>;

  public abstract getUserNotifications(
    userId: string,
  ): Promise<NotificationEntity[]>;

  public abstract getNotificationById(
    id: string,
  ): Promise<NotificationEntity | null>;

  public abstract updateNotification(
    notification: NotificationEntity,
  ): Promise<void>;
}
