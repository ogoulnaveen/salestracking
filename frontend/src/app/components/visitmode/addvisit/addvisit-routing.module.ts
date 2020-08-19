import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddvisitComponent} from './addvisit.component';

const routes: Routes = [
  {
    path: '',
    component: AddvisitComponent,
    data: {
      breadcrumb: 'Add visit',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddvisitRoutingModule { }
