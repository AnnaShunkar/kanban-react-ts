import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workspace.findMany({
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }
  async findOne(id: string) {
    return this.prisma.workspace.findUnique({
      where: { id },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: {
        title: createWorkspaceDto.title,
        userId: createWorkspaceDto.userId,
      },
    });
  }
  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: { id },
      data: {
        title: updateWorkspaceDto.title,
      },
    });
  }
  async remove(id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
