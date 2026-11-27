import { TestBed } from '@angular/core/testing';
import { DemoData } from '@core/demo/demo-data';
import { DEMO_DATA_SOURCES } from '@core/demo/demo-data-source';
import { BrowserStorage } from '@core/storage/browser-storage';
import { LocalStorageProjectsRepository } from '@features/projects/data/local-storage-projects-repository';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { DEMO_PROJECTS } from '@features/projects/demo/demo-projects';
import { DEMO_TASKS } from '@features/projects/demo/demo-tasks';
import { ProjectsDemoDataSource } from '@features/projects/demo/projects-demo-data-source';
import { ProjectsStore } from '@features/projects/projects-store';
import { LocalStorageTasksRepository } from '@features/projects/tasks/data/local-storage-tasks-repository';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';

describe('ProjectsDemoDataSource', () => {
  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        BrowserStorage,
        DemoData,
        ProjectsStore,
        { provide: ProjectsRepository, useClass: LocalStorageProjectsRepository },
        { provide: TasksRepository, useClass: LocalStorageTasksRepository },
        { provide: DEMO_DATA_SOURCES, useClass: ProjectsDemoDataSource, multi: true },
      ],
    });
  });

  it('loads demo projects and tasks only once', async () => {
    const demo = TestBed.inject(DemoData);
    const projectsStore = TestBed.inject(ProjectsStore);
    const tasksRepository = TestBed.inject(TasksRepository);

    expect(demo.isActive()).toBe(false);

    await demo.load();
    await demo.load();

    expect(demo.isActive()).toBe(true);

    expect(projectsStore.projects()).toEqual(DEMO_PROJECTS);

    for (const project of DEMO_PROJECTS) {
      const expectedTasks = DEMO_TASKS.filter((task) => task.projectId === project.id);
      expect(await tasksRepository.getByProjectId(project.id)).toEqual(expectedTasks);
    }
  });

  it('clears demo and user data and disables demo mode', async () => {
    const demo = TestBed.inject(DemoData);
    const projectsStore = TestBed.inject(ProjectsStore);
    const projectsRepository = TestBed.inject(ProjectsRepository);
    const tasksRepository = TestBed.inject(TasksRepository);

    await demo.load();

    const project = await projectsStore.create({ name: 'a', description: '' });
    const number = await projectsStore.issueTaskNumber(project.id);

    await tasksRepository.create({
      projectId: project.id,
      number,
      title: 'b',
      description: '',
      priority: 'medium',
    });

    await demo.clear();

    expect(demo.isActive()).toBe(false);
    expect(await projectsRepository.getAll()).toEqual([]);
    expect(projectsStore.projects()).toEqual([]);

    for (const { id } of [...DEMO_PROJECTS, project]) {
      expect(await tasksRepository.getByProjectId(id)).toEqual([]);
    }
  });

  it('restores demo mode from storage after reopening', async () => {
    const demo = TestBed.inject(DemoData);
    await demo.load();

    const reopened = TestBed.runInInjectionContext(() => new DemoData());

    expect(reopened.isActive()).toBe(true);

    await reopened.clear();

    const afterClear = TestBed.runInInjectionContext(() => new DemoData());
    expect(afterClear.isActive()).toBe(false);
  });
});
