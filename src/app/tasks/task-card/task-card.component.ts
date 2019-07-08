import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Task } from 'src/app/_models/Task';
import { TaskStatus } from 'src/app/_models/enums';
import { TaskCreateModalComponent } from '../task-create-modal/task-create-modal.component';
import { TaskService } from 'src/app/_services/task.service';
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
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.statuses = Object.keys(TaskStatus);
    this.statuses = this.statuses.slice(this.statuses.length / 2);
  }

  addSubTask() {
    const taskToCreate: Task = {
      id: 0,
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
        this.taskService.addTask(newTask).subscribe(() => {
          this.alertify.success('Subtask added successfully');
        });
      }
    });
  }

  deleteTask() {
    let confirmMessage = 'Are you sure you want to delete this task?';
    if (this.task.subtasks != null && this.task.subtasks.length) {
      confirmMessage += ` Warning: this task has ${
        this.taskService.flattenDeep(this.task.subtasks).length
      } subtasks`;
    }
    this.alertify.confirm(confirmMessage, () => {
      this.taskService.deleteTask(this.task).subscribe(() => {
        this.alertify.success('The task was deleted');
      });
    });
  }
}
