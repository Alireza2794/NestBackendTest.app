import { Module } from '@nestjs/common';
import { AllTaskModule } from './all-task/all-task.module';


@Module({
  imports: [AllTaskModule]
})
export class AppModule {}
