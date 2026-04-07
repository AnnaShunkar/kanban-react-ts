import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from '../../database/entities';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async findAll() {
    return this.columnsRepository.find({
      relations: {
        tasks: true,
      },
    });
  }

  async findOne(id: string) {
    return this.columnsRepository.findOne({
      where: { id },
      relations: {
        tasks: true,
      },
    });
  }

  async create(createColumnDto: CreateColumnDto) {
    const column = this.columnsRepository.create({
      id: randomUUID(),
      title: createColumnDto.title,
      workspaceId: createColumnDto.workspaceId,
    });
    return this.columnsRepository.save(column);
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    await this.columnsRepository.update(id, { title: updateColumnDto.title });
    return this.findOne(id);
  }

  async remove(id: string) {
    const column = await this.findOne(id);
    if (column) {
      await this.columnsRepository.remove(column);
    }
    return column;
  }
}
