import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TasksDataPassingService } from '../_services/tasks-data-passing.service';
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
    private tasksDataService: TasksDataPassingService,
    private modalService: BsModalService,
    private taskService: TaskService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  addTask() {
    let counter = 0;
    if (localStorage.getItem('counter')) {
      counter = +localStorage.getItem('counter');
    }
    const taskToCreate = {
      id: counter++,
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
          localStorage.setItem('counter', counter.toString());
          this.tasksDataService.updatedData(tasks.sort((a, b) => a.id - b.id));
          this.alertify.success('Task added successfully');
        });
      }
    });
  }
}
