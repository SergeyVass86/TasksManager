import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/_services/task.service';
import { Task } from 'src/app/_models/task';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TasksDataPassingService } from 'src/app/_services/tasks-data-passing.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  bsModalRef: BsModalRef;

  constructor(
    private taskService: TaskService,
    private tasksDataService: TasksDataPassingService
  ) {}

  ngOnInit() {
    this.tasksDataService.currentMessage.subscribe(data => (this.tasks = data));

    this.taskService
      .getTasks()
      .subscribe(tasks => (this.tasks = tasks.sort((a, b) => a.id - b.id)));
  }
}
