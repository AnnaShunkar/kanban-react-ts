import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { TasksModule } from './modules/tasks/task.module';
import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WorkspacesModule,
    ColumnsModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
