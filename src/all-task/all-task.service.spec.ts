import { Test, TestingModule } from '@nestjs/testing';
import { AllTaskService } from './all-task.service';

describe('AllTaskService', () => {
  let service: AllTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllTaskService],
    }).compile();

    service = module.get<AllTaskService>(AllTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
