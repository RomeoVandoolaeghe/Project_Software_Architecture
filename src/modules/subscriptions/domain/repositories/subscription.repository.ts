import { SubscriptionEntity } from '../entities/subscription.entity';

export abstract class SubscriptionRepository {
  // S'abonner
  public abstract addSubscription(
    subscription: SubscriptionEntity,
  ): Promise<void>;

  // Se désabonner
  public abstract removeSubscription(
    subscriberId: string,
    authorId: string,
  ): Promise<void>;

  // get all sucscribers of an author
  public abstract getSubscribersByAuthorId(
    authorId: string,
  ): Promise<SubscriptionEntity[]>;

  // verify if a subscriber is already subscribed to an author
  public abstract hasSubscription(
    subscriberId: string,
    authorId: string,
  ): Promise<boolean>;
}
