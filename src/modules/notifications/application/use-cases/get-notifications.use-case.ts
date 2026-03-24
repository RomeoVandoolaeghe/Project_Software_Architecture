import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

@Injectable()
export class GetNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(userId: string) {
    const notifications =
      await this.notificationRepository.getUserNotifications(userId);
    return notifications.map((notif) => notif.toJSON());
  }
}
