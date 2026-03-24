import { Controller, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { SubscribeToAuthorUseCase } from '../../application/use-cases/subscribe-to-author.use-case';
import { UnsubscribeFromAuthorUseCase } from '../../application/use-cases/unsubscribe-from-author.use-case';
import { SubscribeDto } from '../../application/dtos/subscribe.dto';

@Controller('authors/:authorId/subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscribeToAuthorUseCase: SubscribeToAuthorUseCase,
    private readonly unsubscribeFromAuthorUseCase: UnsubscribeFromAuthorUseCase,
  ) {}

  @Post()
  async subscribe(
    @Param('authorId') authorId: string,
    @Body() input: SubscribeDto,
  ) {
    await this.subscribeToAuthorUseCase.execute(input.subscriberId, authorId);
  }

  @Delete()
  async unsubscribe(
    @Param('authorId') authorId: string,
    @Query('subscriberId') subscriberId: string,
  ) {
    await this.unsubscribeFromAuthorUseCase.execute(subscriberId, authorId);
  }
}
