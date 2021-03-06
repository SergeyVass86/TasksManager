import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskStatisticsComponent } from './tasks/task-statistics/task-statistics.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: '',
    children: [
      {
        path: 'tasks/:id',
        component: TaskEditComponent
      },
      {
        path: 'statistics',
        component: TaskStatisticsComponent
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
