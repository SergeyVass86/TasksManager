import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
   BsDropdownModule,
   ModalModule
 } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskService } from './_services/task.service';
import { AlertifyService } from './_services/alertify.service';
import { SplitByUpperCasePipe } from './_pipes/splitByUpperCase.pipe';
import { StatusEnumToClassPipe } from './_pipes/statusEnumToClass.pipe';
import { StatusEnumToIconPipe } from './_pipes/statusEnumToIcon.pipe';
import { TaskCreateModalComponent } from './tasks/task-create-modal/task-create-modal.component';
import { TaskStatisticsComponent } from './tasks/task-statistics/task-statistics.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TaskListComponent,
      TaskCardComponent,
      TaskEditComponent,
      SplitByUpperCasePipe,
      StatusEnumToClassPipe,
      StatusEnumToIconPipe,
      TaskCreateModalComponent,
      TaskStatisticsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [
      TaskService,
      AlertifyService
   ],
   entryComponents: [TaskCreateModalComponent],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
