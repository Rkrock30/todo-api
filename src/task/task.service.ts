import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto) {
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  findAll(query: any) {
    const { page = 1, limit = 10, status, priority } = query;
    const take = +limit;
    const skip = (page - 1) * take;

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    return this.taskRepo.findAndCount({ where, take, skip, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    const updated = Object.assign(task, dto);
    return this.taskRepo.save(updated);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepo.remove(task);
  }
}
