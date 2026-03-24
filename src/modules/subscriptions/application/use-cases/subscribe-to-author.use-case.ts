import { Injectable, BadRequestException } from '@nestjs/common';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable()
export class SubscribeToAuthorUseCase {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  public async execute(subscriberId: string, authorId: string): Promise<void> {
    //cant subscribe to oneself
    if (subscriberId === authorId) {
      throw new BadRequestException(
        'Vous ne pouvez pas vous abonner à vous-même.',
      );
    }

    //cant subscribe twice to the same author
    const alreadySubscribed = await this.subscriptionRepository.hasSubscription(
      subscriberId,
      authorId,
    );
    if (alreadySubscribed) {
      throw new BadRequestException('Vous êtes déjà abonné à cet auteur.');
    }

    const subscription = SubscriptionEntity.create(subscriberId, authorId);
    await this.subscriptionRepository.addSubscription(subscription);
  }
}
