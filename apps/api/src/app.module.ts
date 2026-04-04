import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [PrismaModule, WorkspacesModule, ColumnsModule],
})
export class AppModule {}
