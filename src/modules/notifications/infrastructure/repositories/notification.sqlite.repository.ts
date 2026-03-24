import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NotificationEntity } from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationSqliteEntity } from '../entities/notification.sqlite.entity';

@Injectable()
export class SQLiteNotificationRepository implements NotificationRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async createNotification(
    notification: NotificationEntity,
  ): Promise<void> {
    const storage = this.dataSource.getRepository(NotificationSqliteEntity);
    const data = notification.toJSON();

    const sqliteNotification = storage.create({
      id: data.id as string,
      userId: data.userId as string,
      message: data.message as string,
      isRead: data.isRead as boolean,
      createdAt: new Date(data.createdAt as string),
    });

    await storage.save(sqliteNotification);
  }

  public async getUserNotifications(
    userId: string,
  ): Promise<NotificationEntity[]> {
    const notifications = await this.dataSource
      .getRepository(NotificationSqliteEntity)
      .find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });

    return notifications.map((notif) =>
      NotificationEntity.reconstitute({ ...notif }),
    );
  }

  public async getNotificationById(
    id: string,
  ): Promise<NotificationEntity | null> {
    const notification = await this.dataSource
      .getRepository(NotificationSqliteEntity)
      .findOne({
        where: { id },
      });

    if (!notification) {
      return null;
    }

    return NotificationEntity.reconstitute({ ...notification });
  }

  public async updateNotification(
    notification: NotificationEntity,
  ): Promise<void> {
    const storage = this.dataSource.getRepository(NotificationSqliteEntity);
    const data = notification.toJSON();

    await storage.update(data.id as string, {
      isRead: data.isRead as boolean,
    });
  }
}
