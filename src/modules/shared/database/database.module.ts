import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SQLitePostEntity } from 'src/modules/posts/infrastructure/entities/post.sqlite.entity';
import { SQLiteUserEntity } from 'src/modules/users/infrastructure/entities/user.sqlite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [SQLitePostEntity, SQLiteUserEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
