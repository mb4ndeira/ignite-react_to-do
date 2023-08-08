export const fakeTasks = [
  {
    id: 'bf55d051-1741-4f9b-86a6-97137b24e8a1',
    title: 'Task 1',
    completed: false,
    subtasks: [
      {
        id: '2a0303cd-405a-41b3-b2b4-8759e2c24a99',
        title: 'Subtask 1',
        completed: false,
        subtasks: null,
        parent: 'bf55d051-1741-4f9b-86a6-97137b24e8a1',
      },
    ],
    parent: null,
  },
  {
    id: '72b0b857-2a09-4dbf-8a89-14ef18c6489f',
    title:
      'As a frontend developer, your goal is to develop a task management application for John, a busy professional struggling to stay organized. You must create a user-friendly and visually appealing interface that allows John to create, track, and remove tasks.',
    completed: false,
    subtasks: [],
    parent: null,
  },
];
