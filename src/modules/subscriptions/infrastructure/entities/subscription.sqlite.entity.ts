import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionSqliteEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  subscriberId: string;

  @Column()
  authorId: string;

  @Column()
  createdAt: Date;
}
