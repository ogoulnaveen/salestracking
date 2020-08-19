import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateproductComponent} from './createproduct.component';

const routes: Routes = [
  {
    path: '',
    component: CreateproductComponent,
    data: {
      breadcrumb: 'Createproduct',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateproductRoutingModule { }
