import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Task } from 'src/app/_models/Task';
import { TaskStatus } from 'src/app/_models/enums';
import { TaskCreateModalComponent } from '../task-create-modal/task-create-modal.component';
import { TaskService } from 'src/app/_services/task.service';
import { TasksDataPassingService } from 'src/app/_services/tasks-data-passing.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  statuses: string[] = [];
  bsModalRef: BsModalRef;
  isCollapsed = true;

  constructor(
    private taskService: TaskService,
    private modalService: BsModalService,
    private tasksDataService: TasksDataPassingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.statuses = Object.keys(TaskStatus);
    this.statuses = this.statuses.slice(this.statuses.length / 2);
  }

  addSubTask() {
    let counter = 0;
    if (localStorage.getItem('counter')) {
      counter = +localStorage.getItem('counter');
    }
    const taskToCreate = {
      id: counter++,
      title: '',
      description: '',
      status: 0,
      parentId: this.task.id
    };
    const initialState = {
      task: taskToCreate
    };
    this.bsModalRef = this.modalService.show(TaskCreateModalComponent, {
      initialState
    });
    this.bsModalRef.content.createNewTask.subscribe((newTask: Task) => {
      if (newTask.title !== '') {
        this.taskService.addTask(newTask).subscribe(tasks => {
          localStorage.setItem('counter', counter.toString());
          this.tasksDataService.updatedData(tasks.sort((a, b) => a.id - b.id));
        });
      }
    });
  }

  deleteTask() {
    let confirmMessage = 'Are you sure you want to delete this task?';
    if (this.task.subtasks != null && this.task.subtasks.length) {
      confirmMessage += ` Warning: this task has ${
        this.task.subtasks.length
      } subtasks`;
    }
    this.alertify.confirm(confirmMessage, () => {
      this.taskService
        .deleteTask(this.task)
        .subscribe(tasks =>
          this.tasksDataService.updatedData(tasks.sort((a, b) => a.id - b.id))
        );
    });
  }
}
