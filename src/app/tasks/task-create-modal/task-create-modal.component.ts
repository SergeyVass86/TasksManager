import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Task } from 'src/app/_models/Task';
import { TaskStatus } from 'src/app/_models/enums';

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.css']
})
export class TaskCreateModalComponent implements OnInit {
  @Output() createNewTask = new EventEmitter();
  task: Task;
  statuses = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    const statusesFromEnum = Object.keys(TaskStatus);
    const halfLength = statusesFromEnum.length / 2;
    for (let i = 0; i < halfLength; i++) {
      this.statuses.push({
        value: statusesFromEnum[i],
        display: statusesFromEnum[halfLength + i]
      });
    }
  }

  createTask() {
    this.createNewTask.emit(this.task);
    this.bsModalRef.hide();
  }
}
