import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from 'src/app/_models/Task';
import { TaskService } from 'src/app/_services/task.service';
import { TaskStatus } from 'src/app/_models/enums';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  task: Task;
  statuses = [];
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private taskService: TaskService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.getTask(+this.route.snapshot.params.id).subscribe(task => {
      if (task != null) {
        this.task = task;
      } else {
        this.alertify.error('The task does not exist');
        this.router.navigate(['']);
      }
    });

    const statusesFromEnum = Object.keys(TaskStatus);
    const halfLength = statusesFromEnum.length / 2;
    for (let i = 0; i < halfLength; i++) {
      this.statuses.push({
        value: statusesFromEnum[i],
        display: statusesFromEnum[halfLength + i]
      });
    }
  }

  updateTask() {
    this.task.status = +this.task.status;
    this.taskService
      .updateTask(this.task)
      .subscribe(() => {
        this.alertify.success('Task updated successfully');
        this.router.navigate(['']);
      });
  }
}
