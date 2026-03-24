import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SQLitePostEntity } from '../../posts/infrastructure/entities/post.sqlite.entity';
import { SQLiteUserEntity } from '../../users/infrastructure/entities/user.sqlite.entity';
import { CommentSqliteEntity } from '../../comments/infrastructure/entities/comment.sqlite.entity';
import { SubscriptionSqliteEntity } from '../../subscriptions/infrastructure/entities/subscription.sqlite.entity';
import { NotificationSqliteEntity } from '../../notifications/infrastructure/entities/notification.sqlite.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        entities: [
          SQLitePostEntity,
          SQLiteUserEntity,
          CommentSqliteEntity,
          SubscriptionSqliteEntity,
          NotificationSqliteEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
