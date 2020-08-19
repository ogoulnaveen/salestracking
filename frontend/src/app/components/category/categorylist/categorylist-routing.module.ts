import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategorylistComponent} from './categorylist.component';

const routes: Routes = [
  {
    path: '',
    component: CategorylistComponent,
    data: {
      breadcrumb: 'Category list',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorylistRoutingModule { }
