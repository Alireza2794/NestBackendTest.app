import { Test, TestingModule } from '@nestjs/testing';
import { AllTaskController } from './all-task.controller';
import { AllTaskService } from './all-task.service';

describe('AllTaskController', () => {
  let controller: AllTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllTaskController],
      providers: [AllTaskService],
    }).compile();

    controller = module.get<AllTaskController>(AllTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
