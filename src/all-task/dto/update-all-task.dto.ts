import { PartialType } from '@nestjs/swagger';
import { CreateAllTaskDto } from './create-all-task.dto';

export class UpdateAllTaskDto extends PartialType(CreateAllTaskDto) {}
