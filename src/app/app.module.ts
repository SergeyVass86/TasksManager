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

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TaskListComponent,
      TaskCardComponent,
      TaskEditComponent,
      SplitByUpperCasePipe
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
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
