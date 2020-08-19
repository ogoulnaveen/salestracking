import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AttendanceLoginComponent} from './attendance-login.component';

const routes: Routes = [
  {
    path: '',
    component:  AttendanceLoginComponent,
    data: {
      breadcrumb: 'Attendance Login',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceLoginRoutingModule { }
