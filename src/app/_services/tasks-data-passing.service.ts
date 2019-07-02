import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../_models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksDataPassingService {
  private messageService = new BehaviorSubject<Task[]>([]);
  currentMessage = this.messageService.asObservable();

  constructor() {}

  updatedData(data: Task[]) {
    this.messageService.next(data);
  }
}
