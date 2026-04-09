import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../database/entities';
import { KafkaEventsService } from '../kafka/kafka-events.service';

@Injectable()
export class TasksService {
  private readonly logger: Logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly kafkaEventsService: KafkaEventsService,
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
    const savedTask = await this.tasksRepository.save(task);
    try {
      await this.kafkaEventsService.publishTaskCreatedEvent({
        id: savedTask.id,
        title: savedTask.title,
        columnId: savedTask.columnId,
        createdAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown Kafka publish error';
      this.logger.error(`Failed to publish task.created event: ${errorMessage}`);
    }
    return savedTask;
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
