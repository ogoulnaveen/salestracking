import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductlistComponent} from './productlist.component';

const routes: Routes = [
  {
    path: '',
    component: ProductlistComponent,
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
export class ProductlistRoutingModule { }
