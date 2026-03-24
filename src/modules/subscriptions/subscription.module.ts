import { Module } from '@nestjs/common';
import { SubscriptionController } from './infrastructure/controllers/subscription.controller';
import { SubscribeToAuthorUseCase } from './application/use-cases/subscribe-to-author.use-case';
import { UnsubscribeFromAuthorUseCase } from './application/use-cases/unsubscribe-from-author.use-case';
import { SubscriptionRepository } from './domain/repositories/subscription.repository';
import { SQLiteSubscriptionRepository } from './infrastructure/repositories/subscription.sqlite.repository';

@Module({
  controllers: [SubscriptionController],
  providers: [
    SubscribeToAuthorUseCase,
    UnsubscribeFromAuthorUseCase,
    {
      provide: SubscriptionRepository,
      useClass: SQLiteSubscriptionRepository,
    },
  ],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
