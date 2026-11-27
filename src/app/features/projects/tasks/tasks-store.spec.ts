import { TestBed } from '@angular/core/testing';
import { ProjectsStore } from '@features/projects/projects-store';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';
import { NewTask, Task, TaskInput } from '@features/projects/tasks/task.model';
import { TasksStore } from '@features/projects/tasks/tasks-store';

function createTask(id: string, projectId = 'p1'): Task {
  return {
    id,
    projectId,
    number: 1,
    status: 'todo',
    position: 0,
    priority: 'medium',
    title: id,
    description: '',
    createdAt: '2026-01-01T00:00:00.000Z',
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

describe('TasksStore', () => {
  let store: TasksStore;

  const repository = {
    getByProjectId: vi.fn<(projectId: string) => Promise<Task[]>>(),
    create: vi.fn<(input: NewTask) => Promise<Task>>(),
    move: vi.fn<TasksRepository['move']>(),
  };

  const projectsStore = {
    issueTaskNumber: vi.fn<(projectId: string) => Promise<number>>(),
  };

  beforeEach(() => {
    vi.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        TasksStore,
        { provide: TasksRepository, useValue: repository },
        { provide: ProjectsStore, useValue: projectsStore },
      ],
    });

    store = TestBed.inject(TasksStore);
  });

  describe('load', () => {
    it('loads tasks for the selected project', async () => {
      const tasks = [createTask('a')];
      repository.getByProjectId.mockResolvedValue(tasks);

      await store.load('p1');

      expect(repository.getByProjectId).toHaveBeenCalledWith('p1');
      expect(store.tasks()).toEqual(tasks);
    });

    it('clears the previous project while the next project is loading', async () => {
      repository.getByProjectId.mockResolvedValue([createTask('a')]);
      await store.load('p1');

      const pending = deferred<Task[]>();
      repository.getByProjectId.mockReturnValueOnce(pending.promise);

      const loading = store.load('p2');

      expect(store.tasks()).toEqual([]);

      pending.resolve([createTask('b', 'p2')]);
      await loading;

      expect(store.tasks()).toEqual([createTask('b', 'p2')]);
    });

    it('ignores an outdated response after switching projects', async () => {
      const first = deferred<Task[]>();
      const second = deferred<Task[]>();

      repository.getByProjectId
        .mockReturnValueOnce(first.promise)
        .mockReturnValueOnce(second.promise);

      const firstLoad = store.load('p1');
      const secondLoad = store.load('p2');

      second.resolve([createTask('b', 'p2')]);
      await secondLoad;

      first.resolve([createTask('a', 'p1')]);
      await firstLoad;

      expect(store.tasks()).toEqual([createTask('b', 'p2')]);
    });
  });

  describe('create', () => {
    const input: TaskInput = {
      title: 'b',
      description: '',
      priority: 'medium',
    };

    it('rejects creation when no project is loaded', async () => {
      await expect(store.create(input)).rejects.toThrow('No project is loaded');

      expect(projectsStore.issueTaskNumber).not.toHaveBeenCalled();
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('issues a number and appends the created task to the current project', async () => {
      const existingTask = createTask('a');
      const createdTask: Task = {
        ...createTask('b'),
        ...input,
        number: 2,
        position: 1,
      };

      repository.getByProjectId.mockResolvedValue([existingTask]);
      projectsStore.issueTaskNumber.mockResolvedValue(createdTask.number);
      repository.create.mockResolvedValue(createdTask);

      await store.load('p1');
      const result = await store.create(input);

      expect(projectsStore.issueTaskNumber).toHaveBeenCalledWith('p1');
      expect(repository.create).toHaveBeenCalledWith({
        ...input,
        projectId: 'p1',
        number: 2,
      });
      expect(result).toEqual(createdTask);
      expect(store.tasks()).toEqual([existingTask, createdTask]);
    });

    it('keeps the task in its original project if the user switches projects', async () => {
      const currentTask = createTask('a', 'p2');
      const createdTask = { ...createTask('b'), ...input };

      repository.getByProjectId.mockResolvedValueOnce([]).mockResolvedValueOnce([currentTask]);

      const pendingNumber = deferred<number>();
      projectsStore.issueTaskNumber.mockReturnValueOnce(pendingNumber.promise);

      repository.create.mockResolvedValue(createdTask);

      await store.load('p1');

      const creating = store.create(input);
      await store.load('p2');

      pendingNumber.resolve(createdTask.number);
      await creating;

      expect(repository.create).toHaveBeenCalledWith({
        ...input,
        projectId: 'p1',
        number: createdTask.number,
      });

      expect(store.tasks()).toEqual([currentTask]);
    });
  });

  describe('move', () => {
    it('restores the previous tasks when saving a move fails', async () => {
      const task = createTask('a');
      repository.getByProjectId.mockResolvedValue([task]);
      await store.load('p1');

      const saving = deferred<void>();
      repository.move.mockReturnValueOnce(saving.promise);

      const moving = store.move(task.id, 'done', 0);
      expect(store.tasks()[0]?.status).toBe('done');

      const error = new Error('Save failed');
      const rejection = expect(moving).rejects.toBe(error);
      saving.reject(error);
      await rejection;

      expect(store.tasks()).toEqual([task]);
    });

    it('keeps the current project task if saving a move in the old project fails', async () => {
      const firstTask = createTask('a');
      const currentTask = createTask('b', 'p2');

      repository.getByProjectId
        .mockResolvedValueOnce([firstTask])
        .mockResolvedValueOnce([currentTask]);

      const saving = deferred<void>();
      repository.move.mockReturnValueOnce(saving.promise);

      await store.load('p1');
      const moving = store.move(firstTask.id, 'done', 0);
      await store.load('p2');

      const error = new Error('Save failed');
      const rejection = expect(moving).rejects.toBe(error);
      saving.reject(error);
      await rejection;

      expect(store.tasks()).toEqual([currentTask]);
    });
  });
});
