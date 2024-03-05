import { Module } from '@nestjs/common';
import { AllTaskService } from './all-task.service';
import { AllTaskController } from './all-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllTask } from './entities/all-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllTask])],
  controllers: [AllTaskController],
  providers: [AllTaskService],
})
export class AllTaskModule { }
