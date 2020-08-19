import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulevisitComponent } from './schedulevisit/schedulevisit.component';
import { AssignedvisitsComponent } from './assignedvisits/assignedvisits.component';




const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'managevisit',
      status: false
    },
    children: [
      {
        path: 'schedulevisit',
        component: SchedulevisitComponent
      },
      {
        path: 'schedulevisit/:id',
        component: SchedulevisitComponent
      },
      {
        path: 'assignedvisit',
        component: AssignedvisitsComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManagevisitsRoutingModule { }