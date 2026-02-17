import { Module } from '@nestjs/common';
import { LogPostCreatedEventHandler } from './application/event-handlers/log-post-created.event-handler';
import { LoggingService } from './domain/services/logging.service';
import { ConsoleLoggingService } from './infrastructure/services/logging.console.service';

@Module({
  providers: [
    {
      provide: LoggingService,
      useClass: ConsoleLoggingService,
    },

    LogPostCreatedEventHandler,
  ],
  exports: [LoggingService],
})
export class LoggingModule {}
