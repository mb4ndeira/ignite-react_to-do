import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

import { AppModule } from '../src/app.module';
import { fakeTasks } from './data';

const uuidRegex =
  /^(?i)[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const http = supertest(app.getHttpServer());

  it('(GET) /tasks/my', () => {
    return http.get('/tasks/my').expect(200).expect(fakeTasks);
  });

  it('(POST) /tasks/', () => {
    const task = {
      title: 'Go to market',
      parent: null,
    };

    return http
      .post('/tasks/my')
      .send(task)
      .expect(201)
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: expect.stringMatching(uuidRegex),
          title: 'Buy lettuce',
          completed: false,
          subtasks: [],
          parent: null,
        }),
      );
  });

  it('(POST) /tasks/ *create substask', () => {
    const parent = fakeTasks[0].id;
    const task = {
      title: 'Buy lettuce',
      parent,
    };

    return http
      .post('/tasks/my')
      .send(task)
      .expect(201)
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: expect.stringMatching(uuidRegex),
          title: 'Buy lettuce',
          completed: false,
          subtasks: null,
          parent,
        }),
      );
  });

  it('(POST) /tasks/ *with invalid body returns 400', () => {
    const invalidTask = {
      tile: 'Buy lettuce', // Misspelled param
      parent: null,
    };

    return http
      .post('/tasks/')
      .send(invalidTask)
      .expect(400)
      .expect({ message: 'Missing body params' });
  });

  it('(DELETE) /tasks/:task-id', () => {
    return http.del('/tasks/:task-id').expect(204);
  });

  test(`(DELETE) /tasks/:unexistent-task-id *returns 404`, () => {
    return http
      .del('/tasks/:unexistent-task-id')
      .expect(404)
      .expect({ message: 'Resource not found' });
  });
});
