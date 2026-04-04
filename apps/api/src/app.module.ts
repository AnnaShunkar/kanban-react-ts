import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [PrismaModule, WorkspacesModule],
})
export class AppModule {}
