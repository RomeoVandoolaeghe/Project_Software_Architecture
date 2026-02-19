import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/posts/post.module';
import { DatabaseModule } from './modules/shared/database/database.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    DatabaseModule,
    EventEmitterModule.forRoot(),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
