import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceLoginComponent } from './attendance-login/attendance-login.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'visitmode',
      status: false
    },
    children: [
      {
        path: 'attendancelogin',
        component: AttendanceLoginComponent
      },
      {
        path: 'attendancelist',
        component: AttendanceListComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttendanceRoutingModule { }