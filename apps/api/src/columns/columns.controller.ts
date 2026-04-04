import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnsService } from './columns.service';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }
  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
