import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchedulevisitComponent} from './schedulevisit.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulevisitComponent,
    data: {
      breadcrumb: 'managevisit',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulevisitRoutingModule { }
