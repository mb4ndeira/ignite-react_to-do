import { DynamicModule, Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { TasksService } from './providers/tasks.service';

@Module({})
export class TasksModule {
  static register(props: Record<'tasksRepository', any>): DynamicModule {
    return {
      module: TasksModule,
      controllers: [TasksController],
      providers: [
        props.tasksRepository,
        {
          provide: TasksService,
          useFactory: (tasksRepository) => new TasksService(tasksRepository),
          inject: [props.tasksRepository],
        },
      ],
    };
  }
}
