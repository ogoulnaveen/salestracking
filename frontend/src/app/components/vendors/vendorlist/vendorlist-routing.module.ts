import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendorlistComponent} from './vendorlist.component';

const routes: Routes = [
  {
    path: '',
    component: VendorlistComponent,
    data: {
      breadcrumb: 'Vendorlist',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorlistRoutingModule { }
