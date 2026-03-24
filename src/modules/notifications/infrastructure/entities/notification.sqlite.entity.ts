import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('notifications')
export class NotificationSqliteEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column('text')
  message: string;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: Date;
}
