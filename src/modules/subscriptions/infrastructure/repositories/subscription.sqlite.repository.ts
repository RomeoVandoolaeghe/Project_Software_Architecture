import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { SubscriptionSqliteEntity } from '../entities/subscription.sqlite.entity';

@Injectable()
export class SQLiteSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async addSubscription(
    subscription: SubscriptionEntity,
  ): Promise<void> {
    const storage = this.dataSource.getRepository(SubscriptionSqliteEntity);
    const data = subscription.toJSON();

    const sqliteSubscription = storage.create({
      id: data.id as string,
      subscriberId: data.subscriberId as string,
      authorId: data.authorId as string,
      createdAt: new Date(data.createdAt as string),
    });

    await storage.save(sqliteSubscription);
  }

  public async removeSubscription(
    subscriberId: string,
    authorId: string,
  ): Promise<void> {
    await this.dataSource.getRepository(SubscriptionSqliteEntity).delete({
      subscriberId,
      authorId,
    });
  }

  public async getSubscribersByAuthorId(
    authorId: string,
  ): Promise<SubscriptionEntity[]> {
    const subscriptions = await this.dataSource
      .getRepository(SubscriptionSqliteEntity)
      .find({
        where: { authorId },
      });

    return subscriptions.map((sub) =>
      SubscriptionEntity.reconstitute({ ...sub }),
    );
  }

  public async hasSubscription(
    subscriberId: string,
    authorId: string,
  ): Promise<boolean> {
    const count = await this.dataSource
      .getRepository(SubscriptionSqliteEntity)
      .count({
        where: { subscriberId, authorId },
      });
    return count > 0;
  }
}
