import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatevendorComponent} from './createvendor.component';

const routes: Routes = [
  {
    path: '',
    component: CreatevendorComponent,
    data: {
      breadcrumb: 'Createvendor',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatevendorRoutingModule { }
