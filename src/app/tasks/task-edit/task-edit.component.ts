import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Task } from 'src/app/_models/Task';
import { TaskService } from 'src/app/_services/task.service';
import { TaskStatus } from 'src/app/_models/enums';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  task: Task;
  statuses = Object.keys(TaskStatus);
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskService
      .getTask(+this.route.snapshot.params.id)
      .subscribe(task => (this.task = task));
  }

  updateTask() {
    console.log(this.task);
  }
}
