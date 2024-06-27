import { Module } from '@nestjs/common';
import { TaskRunner } from './devstudio.command';

@Module({
  providers: [TaskRunner],
})
export class AppModule {}
