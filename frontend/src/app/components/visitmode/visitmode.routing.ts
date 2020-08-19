import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddvisitComponent } from './addvisit/addvisit.component';
import { SearchvisitsComponent } from './searchvisits/searchvisits.component';



const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'visitmode',
      status: false
    },
    children: [
      {
        path: 'addvisit',
        component: AddvisitComponent
      },
      {
        path: 'addvisit/:id',
        component: AddvisitComponent
      },
      {
        path: 'searchvisits',
        component: SearchvisitsComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisitRoutingModule { }