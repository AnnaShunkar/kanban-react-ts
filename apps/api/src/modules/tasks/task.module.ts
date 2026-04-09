import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../database/entities';
import { TasksService } from './task.service';
import { TasksController } from './tasks.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), KafkaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
