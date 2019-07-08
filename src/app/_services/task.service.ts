import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../_models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private messageService = new BehaviorSubject<Task[]>([]);
  currentMessage = this.messageService.asObservable();

  constructor() {}

  getTasks(): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    return new Observable(observer => observer.next(tasks));
  }

  getTask(id: number): Observable<Task> {
    const task = this.findTask(id, this.getTasksFromLocalStorage());
    return new Observable(observer => observer.next(task));
  }

  addTask(task: Task): Observable<Task[]> {
    let counter = this.getCounter();
    task.id = counter++;
    const tasks = this.getTasksFromLocalStorage();
    if (task.parentId != null) {
      const parentTask = this.findTask(task.parentId, tasks);
      this.addTaskToParent(task, parentTask);
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.updateCounter(counter);
    this.updatedData(tasks);
    return new Observable();
  }

  updateTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    if (task.parentId == null) {
      const originalTask = tasks.filter(t => t.id === task.id)[0];
      tasks[tasks.indexOf(originalTask)] = task;
    } else {
      const parentTask = this.findTask(task.parentId, tasks);
      this.updateParentTask(task, parentTask);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => observer.next(tasks));
  }

  deleteTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    if (task.parentId == null) {
      const originalTask = tasks.filter(t => t.id === task.id)[0];
      tasks.splice(tasks.indexOf(originalTask), 1);
    } else {
      const parentTask = this.findTask(task.parentId, tasks);
      this.deleteParentSubtask(task, parentTask);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.updatedData(tasks);
    return new Observable();
  }

  updatedData(data: Task[]) {
    this.messageService.next(data);
  }

  flattenDeep(tasks: Task[]): Task[] {
    return tasks.reduce(
      (acc, val) =>
        Array.isArray(val.subtasks)
          ? acc.concat(val).concat(this.flattenDeep(val.subtasks))
          : acc.concat(val),
      []
    );
  }

  private getTasksFromLocalStorage(): Task[] {
    let tasks = [] as Array<Task>;
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  private findTask(id: number, tasks: Task[]): Task {
    let task = null;
    if (tasks == null || tasks.length === 0) {
      return null;
    }
    if (tasks.filter(t => t.id === id).length > 0) {
      return tasks.filter(t => t.id === id)[0];
    }
    tasks.forEach(t => {
      if (task == null) {
        task = this.findTask(id, t.subtasks);
      }
    });
    return task;
  }

  private addTaskToParent(task: Task, parentTask: Task) {
    if (parentTask.subtasks == null) {
      parentTask.subtasks = [];
    }
    parentTask.subtasks.push(task);
  }

  private updateParentTask(task: Task, parentTask: Task) {
    const originalTask = parentTask.subtasks.filter(t => t.id === task.id)[0];
    parentTask.subtasks[parentTask.subtasks.indexOf(originalTask)] = task;
  }

  private deleteParentSubtask(task: Task, parentTask: Task) {
    const originalTask = parentTask.subtasks.filter(t => t.id === task.id)[0];
    parentTask.subtasks.splice(parentTask.subtasks.indexOf(originalTask), 1);
  }

  private getCounter(): number {
    let counter = 0;
    if (localStorage.getItem('counter')) {
      counter = +localStorage.getItem('counter');
    }
    return counter;
  }

  private updateCounter(counter: number) {
    localStorage.setItem('counter', counter.toString());
  }
}
