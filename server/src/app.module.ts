import { Global, Module } from '@nestjs/common';

import { PrismaService } from './common/database/PrismaService';

import { TasksModule } from './modules/tasks/tasks.module';
import { TasksRepository } from './modules/tasks/providers/repositories/prisma/TasksRepository';

@Global()
@Module({
  imports: [TasksModule.register({ tasksRepository: TasksRepository })],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
