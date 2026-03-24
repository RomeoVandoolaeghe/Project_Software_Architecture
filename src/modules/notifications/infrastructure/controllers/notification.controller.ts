import { Controller, Get, Patch, Param } from '@nestjs/common';
import { GetNotificationsUseCase } from '../../application/use-cases/get-notifications.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/mark-notification-as-read.use-case';

@Controller()
export class NotificationController {
  constructor(
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
    private readonly markNotificationAsReadUseCase: MarkNotificationAsReadUseCase,
  ) {}

  @Get('users/:userId/notifications')
  async getUserNotifications(@Param('userId') userId: string) {
    return this.getNotificationsUseCase.execute(userId);
  }

  @Patch('notifications/:id/read')
  async markAsRead(@Param('id') id: string) {
    await this.markNotificationAsReadUseCase.execute(id);
  }
}
