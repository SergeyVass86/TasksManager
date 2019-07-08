import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TaskCreateModalComponent } from '../tasks/task-create-modal/task-create-modal.component';
import { Task } from '../_models/Task';
import { TaskService } from '../_services/task.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private taskService: TaskService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  addTask() {
    const taskToCreate = {
      id: 0,
      title: '',
      description: '',
      status: 0
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
          this.alertify.success('Task added successfully');
        });
      }
    });
  }
}
