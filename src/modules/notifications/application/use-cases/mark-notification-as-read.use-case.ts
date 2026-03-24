import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

@Injectable()
export class MarkNotificationAsReadUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(notificationId: string): Promise<void> {
    // 1. On cherche la notification
    const notification =
      await this.notificationRepository.getNotificationById(notificationId);

    if (!notification) {
      throw new NotFoundException(
        `La notification ${notificationId} est introuvable.`,
      );
    }

    // 2. On utilise la méthode métier de notre entité
    notification.markAsRead();

    // 3. On sauvegarde la modification
    await this.notificationRepository.updateNotification(notification);
  }
}
