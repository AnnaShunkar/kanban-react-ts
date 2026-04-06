import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { TasksModule } from './modules/tasks/task.module';

@Module({
  imports: [PrismaModule, WorkspacesModule, ColumnsModule, TasksModule],
})
export class AppModule {}
