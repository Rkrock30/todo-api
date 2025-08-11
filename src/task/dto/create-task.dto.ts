import { IsEnum, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/common/enums/status.enum';
import { TaskPriority } from 'src/common/enums/priority.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dueDate: Date;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  isActive?: boolean;
}
