import { TestBed } from '@angular/core/testing';
import { BrowserStorage } from '@core/storage/browser-storage';
import { LocalStorageTasksRepository } from '@features/projects/tasks/data/local-storage-tasks-repository';
import { Task } from '@features/projects/tasks/task.model';

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

describe('LocalStorageTasksRepository', () => {
  let repository: LocalStorageTasksRepository;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [LocalStorageTasksRepository, BrowserStorage],
    });

    repository = TestBed.inject(LocalStorageTasksRepository);
  });

  it('appends a new task to the todo column of its project', async () => {
    const todo = createTask('a');
    const done: Task = { ...createTask('b'), number: 2, status: 'done' };
    const other = createTask('c', 'p2');

    await repository.addMany([todo, done, other]);

    const created = await repository.create({
      projectId: 'p1',
      number: 3,
      title: 'd',
      description: '',
      priority: 'medium',
    });

    expect(created.status).toBe('todo');
    expect(created.position).toBe(1);

    const tasks = await repository.getByProjectId('p1');
    expect(tasks).toEqual(expect.arrayContaining([todo, done, created]));
  });

  it('persists a task move without affecting another project', async () => {
    const task = createTask('a');
    const other = createTask('b', 'p2');

    await repository.addMany([task, other]);
    await repository.move(task.id, 'done', 0);

    expect(await repository.getByProjectId('p1')).toEqual([{ ...task, status: 'done' }]);

    expect(await repository.getByProjectId('p2')).toEqual([other]);
  });

  it('clears tasks from all projects and preserves unrelated storage', async () => {
    await repository.addMany([createTask('a'), createTask('b', 'p2')]);

    localStorage.setItem('other', 'a');

    await repository.deleteAll();

    expect(await repository.getByProjectId('p1')).toEqual([]);
    expect(await repository.getByProjectId('p2')).toEqual([]);
    expect(localStorage.getItem('other')).toBe('a');
  });
});
