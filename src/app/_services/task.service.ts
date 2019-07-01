import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../_models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    let tasks = [] as Array<Task>;
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return new Observable(observer => {
      observer.next(tasks);
    });
  }

  getTask(id: number): Observable<Task> {
    let task: Task = null;
    let tasks = [] as Array<Task>;
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      task = tasks.filter(t => t.id === id)[0];
    }
    console.log(task);
    return new Observable(observer => {
      observer.next(task);
    });
  }

  addTask(task: Task): Observable<Task[]> {
    let tasks = [] as Array<Task>;
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return new Observable(observer => {
      observer.next(tasks);
    });
  }

  deleteTask() {}
}
