import { Module } from '@nestjs/common';
import { NotificationController } from './infrastructure/controllers/notification.controller';
import { GetNotificationsUseCase } from './application/use-cases/get-notifications.use-case';
import { MarkNotificationAsReadUseCase } from './application/use-cases/mark-notification-as-read.use-case';
import { PostCreatedEventHandler } from './application/event-handlers/post-created.event-handler';
import { NotificationRepository } from './domain/repositories/notification.repository';
import { SQLiteNotificationRepository } from './infrastructure/repositories/notification.sqlite.repository';
import { SubscriptionModule } from '../subscriptions/subscription.module';

@Module({
  imports: [SubscriptionModule],
  controllers: [NotificationController],
  providers: [
    GetNotificationsUseCase,
    MarkNotificationAsReadUseCase,
    PostCreatedEventHandler,
    {
      provide: NotificationRepository,
      useClass: SQLiteNotificationRepository,
    },
  ],
})
export class NotificationModule {}
