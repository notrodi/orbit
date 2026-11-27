import { TestBed } from '@angular/core/testing';
import { BrowserStorage } from '@core/storage/browser-storage';
import { LocalStorageProjectsRepository } from '@features/projects/data/local-storage-projects-repository';
import { Project } from '@features/projects/project.model';

describe('LocalStorageProjectsRepository', () => {
  let repository: LocalStorageProjectsRepository;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [LocalStorageProjectsRepository, BrowserStorage],
    });

    repository = TestBed.inject(LocalStorageProjectsRepository);
  });

  it('issues task numbers independently for each project', async () => {
    const first = await repository.create({ name: 'a', description: '' });
    const second = await repository.create({ name: 'b', description: '' });

    expect(await repository.issueTaskNumber(first.id)).toBe(1);
    expect(await repository.issueTaskNumber(first.id)).toBe(2);
    expect(await repository.issueTaskNumber(second.id)).toBe(1);

    const projects = await repository.getAll();

    expect(projects.find((project) => project.id === first.id)?.lastTaskNumber).toBe(2);
    expect(projects.find((project) => project.id === second.id)?.lastTaskNumber).toBe(1);
  });

  it('rejects issuing a task number for an unknown project', async () => {
    const project = await repository.create({ name: 'a', description: '' });

    await expect(repository.issueTaskNumber('missing')).rejects.toThrow(
      'Project missing not found',
    );

    expect(await repository.getAll()).toEqual([project]);
  });

  it('adds a prepared project without replacing existing projects', async () => {
    const existing = await repository.create({ name: 'a', description: '' });

    const prepared: Project = {
      id: 'b',
      name: 'b',
      description: '',
      createdAt: '2026-01-01T00:00:00.000Z',
      lastTaskNumber: 1,
    };

    await repository.addMany([prepared]);

    const projects = await repository.getAll();

    expect(projects).toHaveLength(2);
    expect(projects).toEqual(expect.arrayContaining([existing, prepared]));
  });
});
