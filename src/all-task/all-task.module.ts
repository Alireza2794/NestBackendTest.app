import { Module } from '@nestjs/common';
import { AllTaskService } from './all-task.service';
import { AllTaskController } from './all-task.controller';

@Module({
  controllers: [AllTaskController],
  providers: [AllTaskService],
})
export class AllTaskModule {}
