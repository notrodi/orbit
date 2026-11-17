import { Task, TaskStatus } from '@features/projects/tasks/task.model';

export function byPosition(first: Task, second: Task): number {
  return first.position - second.position;
}

/**
 * Moves a task to `index` in the `status` column of its project
 * and renumbers both affected columns. Returns a new array.
 */
export function moveTask(
  tasks: readonly Task[],
  taskId: string,
  status: TaskStatus,
  index: number,
): Task[] {
  const movedTask = tasks.find((task) => task.id === taskId);

  if (!movedTask) {
    throw new Error(`Task ${taskId} not found`);
  }

  const sourceColumn = getColumn(tasks, movedTask.projectId, movedTask.status).filter(
    (task) => task.id !== taskId,
  );
  const targetColumn =
    movedTask.status === status ? sourceColumn : getColumn(tasks, movedTask.projectId, status);

  targetColumn.splice(index, 0, { ...movedTask, status });

  const changedTasks = new Map(
    [...renumber(sourceColumn), ...renumber(targetColumn)].map((task) => [task.id, task]),
  );

  return tasks.map((task) => changedTasks.get(task.id) ?? task);
}

function getColumn(tasks: readonly Task[], projectId: string, status: TaskStatus): Task[] {
  return tasks
    .filter((task) => task.projectId === projectId && task.status === status)
    .sort(byPosition);
}

function renumber(column: readonly Task[]): Task[] {
  return column.map((task, position) => ({ ...task, position }));
}
