import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DEMO_PROJECTS } from '@features/projects/demo/demo-projects';
import { appConfig } from './app.config';

describe('App routes', () => {
  beforeEach(() => {
    localStorage.clear();

    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens the first demo project from the welcome page', async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);

    const buttons =
      harness.routeNativeElement?.querySelectorAll<HTMLButtonElement>('app-welcome button');

    const addDemoButton = Array.from(buttons ?? []).find(
      (button) => button.textContent?.trim() === 'Add demo data',
    );

    expect(addDemoButton).toBeDefined();
    addDemoButton?.click();

    await vi.waitFor(() => {
      expect(router.url).toBe(`/projects/${DEMO_PROJECTS[0].id}`);
    });

    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('app-project-page')).toBeTruthy();
  });

  it('redirects an unknown project to the welcome page', async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const harness = await RouterTestingHarness.create('/projects/missing');
    const router = TestBed.inject(Router);

    expect(router.url).toBe('/');
    expect(harness.routeNativeElement?.querySelector('app-welcome')).toBeTruthy();
  });
});
