import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.column.findMany({
      include: {
        tasks: true,
      },
    });
  }
  async findOne(id: string) {
    return this.prisma.column.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
  }
  async create(createColumnDto: CreateColumnDto) {
    return this.prisma.column.create({
      data: {
        title: createColumnDto.title,
        workspaceId: createColumnDto.workspaceId,
      },
    });
  }
  async update(id: string, updateColumnDto: UpdateColumnDto) {
    return this.prisma.column.update({
      where: { id },
      data: {
        title: updateColumnDto.title,
      },
    });
  }
  async remove(id: string) {
    return this.prisma.column.delete({
      where: { id },
    });
  }
}
