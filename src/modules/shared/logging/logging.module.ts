import { Module } from '@nestjs/common';
import { LoggingService } from './domain/services/logging.service';
import { ConsoleLoggingService } from './infrastructure/services/logging.console.service';

@Module({
  providers: [
    {
      provide: LoggingService,
      useClass: ConsoleLoggingService,
    },
  ],
  exports: [LoggingService],
})
export class LoggingModule {}
