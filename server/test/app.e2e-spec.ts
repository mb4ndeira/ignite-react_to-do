import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

import { TasksModule } from '../src/modules/tasks/tasks.module';

import { MockTasksRepository } from './mocks/MockTasksRepository';
import { fakeTasks } from './data';

import { subtaskSchema, taskSchema } from '../src/types/Task';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule.register({ tasksRepository: MockTasksRepository })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const http = () => supertest(app.getHttpServer());

  it('(GET) /tasks/my', () => {
    return http().get('/tasks/my').expect(200).expect(fakeTasks);
  });

  it('(POST) /tasks/', () => {
    const task = {
      title: 'Go to market',
      parent: null,
    };

    return http()
      .post('/tasks/')
      .send(task)
      .expect(201)
      .expect(({ body }) => {
        taskSchema.parse(body);

        expect(body).toMatchObject({
          title: 'Go to market',
          completed: false,
          subtasks: [],
          parent: null,
        });
      });
  });

  it('(POST) /tasks/ *create substask', () => {
    const parent = fakeTasks[0].id;
    const task = {
      title: 'Buy lettuce',
      parent,
    };

    return http()
      .post('/tasks/')
      .send(task)
      .expect(201)
      .expect(({ body }) => {
        subtaskSchema.parse(body);

        expect(body).toMatchObject({
          title: 'Buy lettuce',
          completed: false,
          subtasks: null,
          parent,
        });
      });
  });

  it('(POST) /tasks/ *create substask on unexistent parent', () => {
    const unexistentParent = '67a202fd-abad-4cb8-9291-3c4ec002d60b';

    const task = {
      title: 'Buy lettuce',
      parent: unexistentParent,
    };

    return http().post('/tasks/').send(task).expect(404).expect({
      message: 'Invalid parent task',
    });
  });

  it('(POST) /tasks/ *with invalid body returns 400', () => {
    const invalidTask = {
      tile: 'Buy lettuce', // Misspelled param
      parent: null,
    };

    return http()
      .post('/tasks/')
      .send(invalidTask)
      .expect(400)
      .expect({ message: 'Invalid body parameters' });
  });

  // it('(DELETE) /tasks/:task-id', () => {
  //   return http().del('/tasks/:task-id').expect(204);
  // });

  // test(`(DELETE) /tasks/:unexistent-task-id *returns 404`, () => {
  //   return http()
  //     .del('/tasks/:unexistent-task-id')
  //     .expect(404)
  //     .expect({ message: 'Resource not found' });
  // });
});
