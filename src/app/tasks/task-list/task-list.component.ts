import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/_services/task.service';
import { Task } from 'src/app/_models/task';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  bsModalRef: BsModalRef;

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskService.currentMessage.subscribe(data => (this.tasks = data));

    this.taskService
      .getTasks()
      .subscribe(tasks => (this.tasks = tasks.sort((a, b) => a.id - b.id)));
  }
}
