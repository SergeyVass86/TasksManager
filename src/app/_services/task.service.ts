import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../_models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
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
    const tasks = this.getTasksFromLocalStorage();
    if (task.parentId) {
      // const parentTasks = [];
      const parentTask = this.findTask(task.parentId, tasks);
      if (tasks[tasks.indexOf(parentTask)].subtasks == null) {
        tasks[tasks.indexOf(parentTask)].subtasks = [];
      }
      tasks[tasks.indexOf(parentTask)].subtasks.push(task);
      // parentTasks.push(parentTask);
      // while (parentTask != null && parentTask.parentId) {
      //   parentTask = this.findTask(parentTask.parentId, tasks);
      //   if (parentTask != null) {
      //     parentTasks.push(parentTask);
      //   }
      // }
      // for(let i = parentTasks.length - 1; i >= 0; i--) {

      // }
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => observer.next(tasks));
  }

  updateTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    if (task.parentId == null) {
      const originalTask = tasks.filter(t => t.id === task.id)[0];
      tasks[tasks.indexOf(originalTask)] = task;
    } else {
      const parentTask = this.findTask(task.parentId, tasks);
      const originalTask = this.findTask(task.id, tasks);
      tasks[tasks.indexOf(parentTask)].subtasks[
        tasks[tasks.indexOf(parentTask)].subtasks.indexOf(originalTask)
      ] = task;
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
      const originalTask = this.findTask(task.id, tasks);
      tasks[tasks.indexOf(parentTask)].subtasks.splice(
        tasks[tasks.indexOf(parentTask)].subtasks.indexOf(originalTask),
        1
      );
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => observer.next(tasks));
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
}
