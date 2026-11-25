import { byPosition, moveTask } from '@features/projects/tasks/task-position';
import { Task, TaskStatus } from '@features/projects/tasks/task.model';

function createTask(id: string, status: TaskStatus, position: number, projectId = 'p1'): Task {
  return {
    id,
    projectId,
    number: 1,
    status,
    position,
    priority: 'medium',
    title: id,
    description: '',
    createdAt: '2026-01-01T00:00:00.000Z',
  };
}

function column(tasks: readonly Task[], status: TaskStatus, projectId = 'p1'): string[] {
  return tasks
    .filter((task) => task.projectId === projectId && task.status === status)
    .sort(byPosition)
    .map((task) => task.id);
}

function positions(tasks: readonly Task[], status: TaskStatus, projectId = 'p1'): number[] {
  return tasks
    .filter((task) => task.projectId === projectId && task.status === status)
    .sort(byPosition)
    .map((task) => task.position);
}

describe('byPosition', () => {
  it('orders tasks by ascending position', () => {
    const tasks = [
      createTask('c', 'todo', 2),
      createTask('a', 'todo', 0),
      createTask('b', 'todo', 1),
    ];

    expect(tasks.sort(byPosition).map((task) => task.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('moveTask', () => {
  describe('within a column', () => {
    const tasks = [
      createTask('a', 'todo', 0),
      createTask('b', 'todo', 1),
      createTask('c', 'todo', 2),
    ];

    it('moves a task down', () => {
      const result = moveTask(tasks, 'a', 'todo', 2);

      expect(column(result, 'todo')).toEqual(['b', 'c', 'a']);
    });

    it('moves a task up', () => {
      const result = moveTask(tasks, 'c', 'todo', 0);

      expect(column(result, 'todo')).toEqual(['c', 'a', 'b']);
    });

    it('keeps the order when dropped on its own place', () => {
      const result = moveTask(tasks, 'b', 'todo', 1);

      expect(column(result, 'todo')).toEqual(['a', 'b', 'c']);
    });

    it('renumbers position from 0 without gap', () => {
      const result = moveTask(tasks, 'a', 'todo', 2);

      expect(positions(result, 'todo')).toEqual([0, 1, 2]);
    });
  });

  describe('between columns', () => {
    const tasks = [
      createTask('a', 'todo', 0),
      createTask('b', 'todo', 1),
      createTask('c', 'todo', 2),
      createTask('x', 'done', 0),
      createTask('y', 'done', 1),
    ];

    it('inserts at the start of the target column', () => {
      const result = moveTask(tasks, 'b', 'done', 0);

      expect(column(result, 'done')).toEqual(['b', 'x', 'y']);
    });

    it('inserts in the middle of the target column', () => {
      const result = moveTask(tasks, 'b', 'done', 1);

      expect(column(result, 'done')).toEqual(['x', 'b', 'y']);
    });

    it('inserts at the end of the target column', () => {
      const result = moveTask(tasks, 'b', 'done', 2);

      expect(column(result, 'done')).toEqual(['x', 'y', 'b']);
    });

    it('moves into an empty column', () => {
      const result = moveTask(tasks, 'a', 'in-progress', 0);

      expect(column(result, 'in-progress')).toEqual(['a']);
    });

    it('updates the status of the moved task', () => {
      const result = moveTask(tasks, 'b', 'done', 0);

      expect(result.find((task) => task.id === 'b')?.status).toBe('done');
    });

    it('closes the gap in the source column', () => {
      const result = moveTask(tasks, 'b', 'done', 0);

      expect(column(result, 'todo')).toEqual(['a', 'c']);
      expect(positions(result, 'todo')).toEqual([0, 1]);
    });

    it('renumbers the target column without gaps', () => {
      const result = moveTask(tasks, 'b', 'done', 1);

      expect(positions(result, 'done')).toEqual([0, 1, 2]);
    });

    it('leaves the source column empty when its last task is moved', () => {
      const result = moveTask([createTask('a', 'todo', 0)], 'a', 'done', 0);

      expect(column(result, 'todo')).toEqual([]);
      expect(column(result, 'done')).toEqual(['a']);
    });
  });

  describe('isolation', () => {
    it('does not touch tasks of other projects', () => {
      const other = createTask('o', 'done', 5, 'p2');
      const tasks = [createTask('a', 'todo', 0), createTask('x', 'done', 0), other];

      const result = moveTask(tasks, 'a', 'done', 0);

      expect(result.find((task) => task.id === 'o')).toBe(other);
    });

    it('does not mix in other projects when renumbering a column', () => {
      const tasks = [
        createTask('a', 'todo', 0),
        createTask('b', 'todo', 1),
        createTask('o', 'todo', 10, 'p2'),
      ];

      const result = moveTask(tasks, 'a', 'todo', 1);

      expect(column(result, 'todo', 'p1')).toEqual(['b', 'a']);
      expect(column(result, 'todo', 'p2')).toEqual(['o']);
    });

    it('keeps the original array order in the result', () => {
      const tasks = [createTask('a', 'todo', 0), createTask('b', 'todo', 1)];

      const result = moveTask(tasks, 'a', 'todo', 1);

      expect(result.map((task) => task.id)).toEqual(['a', 'b']);
    });
  });

  describe('purity', () => {
    it('does not mutate the input array or its tasks', () => {
      const tasks = [createTask('a', 'todo', 0), createTask('b', 'todo', 1)];
      const snapshot = structuredClone(tasks);

      moveTask(tasks, 'a', 'done', 0);

      expect(tasks).toEqual(snapshot);
    });

    it('returns a new array', () => {
      const tasks = [createTask('a', 'todo', 0)];

      expect(moveTask(tasks, 'a', 'todo', 0)).not.toBe(tasks);
    });
  });

  describe('errors', () => {
    it('throws when the task does not exist', () => {
      expect(() => moveTask([createTask('a', 'todo', 0)], 'missing', 'todo', 0)).toThrow(
        'Task missing not found',
      );
    });
  });
});
