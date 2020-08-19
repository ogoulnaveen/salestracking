import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddexpenseComponent} from './addexpense.component';

const routes: Routes = [
  {
    path: '',
    component: AddexpenseComponent,
    data: {
      breadcrumb: 'Add User',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddexpenseRoutingModule { }
