import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from 'src/app/_services/task.service';
import { Task } from 'src/app/_models/task';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }

  addTask() {
    let counter = 0;
    if (localStorage.getItem('counter')) {
      counter = +localStorage.getItem('counter');
    }
    const task: Task = {
      id: counter++,
      title: 'new task',
      description: 'some description',
      status: 'some status'
    };
    this.taskService.addTask(task).subscribe(tasks => {
      localStorage.setItem('counter', counter.toString());
      this.tasks = tasks;
    });
  }
}
