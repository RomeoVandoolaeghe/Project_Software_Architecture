import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable()
export class UnsubscribeFromAuthorUseCase {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  public async execute(subscriberId: string, authorId: string): Promise<void> {
    await this.subscriptionRepository.removeSubscription(
      subscriberId,
      authorId,
    );
  }
}
