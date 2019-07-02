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
    let tasks = this.getTasksFromLocalStorage();
    if (task.parentId) {
      tasks = this.updateParentTasks(task, tasks);
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => observer.next(tasks));
  }

  updateTask(task: Task): Observable<Task[]> {
    let tasks = this.getTasksFromLocalStorage();
    if (task.parentId == null) {
      const originalTask = tasks.filter(t => t.id === task.id)[0];
      tasks[tasks.indexOf(originalTask)] = task;
    } else {
      tasks = this.updateParentTasks(task, tasks);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => observer.next(tasks));
  }

  deleteTask(task: Task): Observable<Task[]> {
    let tasks = this.getTasksFromLocalStorage();
    if (task.parentId == null) {
      const originalTask = tasks.filter(t => t.id === task.id)[0];
      tasks.splice(tasks.indexOf(originalTask), 1);
    } else {
      tasks = this.deleteParentTask(task, tasks);
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

  private updateParentTasks(task: Task, tasks: Task[]): Task[] {
    let parentId = task.parentId;
    let taskToInsert = task;
    let currentTasksArray = tasks;
    while (parentId) {
      const parentTask = this.findTask(parentId, tasks);
      if (parentTask.parentId) {
        currentTasksArray = this.findTask(parentTask.parentId, tasks).subtasks;
      } else {
        currentTasksArray = tasks;
      }
      if (
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks ==
        null
      ) {
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks = [];
      }
      if (parentTask.subtasks.filter(t => t.id === taskToInsert.id).length) {
        const originalTask = parentTask.subtasks.filter(
          t => t.id === taskToInsert.id
        )[0];
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks[
          currentTasksArray[
            currentTasksArray.indexOf(parentTask)
          ].subtasks.indexOf(originalTask)
        ] = taskToInsert;
      } else {
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks.push(
          taskToInsert
        );
      }
      taskToInsert = parentTask;
      parentId = parentTask.parentId;
    }
    return currentTasksArray;
  }

  private deleteParentTask(task: Task, tasks: Task[]) {
    let parentId = task.parentId;
    let currentTasksArray = tasks;
    while (parentId) {
      const parentTask = this.findTask(parentId, tasks);
      if (parentTask.parentId) {
        currentTasksArray = this.findTask(parentTask.parentId, tasks).subtasks;
      } else {
        currentTasksArray = tasks;
      }
      if (
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks ==
        null
      ) {
        currentTasksArray[currentTasksArray.indexOf(parentTask)].subtasks = [];
      }
      if (parentTask.subtasks.filter(t => t.id === task.id).length) {
        const originalTask = parentTask.subtasks.filter(
          t => t.id === task.id
        )[0];
        currentTasksArray[
          currentTasksArray.indexOf(parentTask)
        ].subtasks.splice(
          currentTasksArray[
            currentTasksArray.indexOf(parentTask)
          ].subtasks.indexOf(originalTask),
          1
        );
      }
      currentTasksArray[currentTasksArray.indexOf(parentTask)] = parentTask;
      parentId = parentTask.parentId;
    }
    return currentTasksArray;
  }
}
