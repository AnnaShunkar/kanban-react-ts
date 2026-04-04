import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.task.findMany();
  }
  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }
  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        columnId: createTaskDto.columnId,
      },
    });
  }
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
      },
    });
  }
  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
