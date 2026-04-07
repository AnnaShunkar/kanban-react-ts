import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from '../../database/entities';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspacesRepository: Repository<Workspace>,
  ) {}

  async findAll() {
    return this.workspacesRepository.find({
      relations: {
        columns: {
          tasks: true,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.workspacesRepository.findOne({
      where: { id },
      relations: {
        columns: {
          tasks: true,
        },
      },
    });
  }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = this.workspacesRepository.create({
      id: randomUUID(),
      title: createWorkspaceDto.title,
      userId: createWorkspaceDto.userId,
    });
    const createdWorkspace = await this.workspacesRepository.save(workspace);
    return this.findOne(createdWorkspace.id);
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    await this.workspacesRepository.update(id, { title: updateWorkspaceDto.title });
    return this.findOne(id);
  }

  async remove(id: string) {
    const workspace = await this.findOne(id);
    if (workspace) {
      await this.workspacesRepository.remove(workspace);
    }
    return workspace;
  }
}
