import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SubscriptionRepository } from '../../../subscriptions/domain/repositories/subscription.repository';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationEntity } from '../../domain/entities/notification.entity';
import { PostCreatedEvent } from '../../../posts/domain/events/post-created.event';
import type { PostCreatedEventPayload } from '../../../posts/domain/events/post-created.event';

@Injectable()
export class PostCreatedEventHandler {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @OnEvent(PostCreatedEvent)
  async handle(event: PostCreatedEventPayload) {
    console.log('evenment reçu dans notification', event);

    const authorId = event.authorId;
    const postTitle = event.title;

    const subscribers =
      await this.subscriptionRepository.getSubscribersByAuthorId(authorId);

    for (const subscription of subscribers) {
      const message = `L'auteur que vous suivez a publié un nouvel article : "${postTitle}"`;
      const notification = NotificationEntity.create(
        subscription.subscriberId,
        message,
      );

      await this.notificationRepository.createNotification(notification);
    }
  }
}
