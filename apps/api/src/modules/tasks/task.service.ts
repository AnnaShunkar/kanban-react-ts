import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../database/entities';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: string) {
    return this.tasksRepository.findOne({
      where: { id },
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      id: randomUUID(),
      title: createTaskDto.title,
      columnId: createTaskDto.columnId,
    });
    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, { title: updateTaskDto.title });
    return this.findOne(id);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    if (task) {
      await this.tasksRepository.remove(task);
    }
    return task;
  }
}
