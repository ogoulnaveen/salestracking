import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatevendorComponent } from './createvendor/createvendor.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Vendors',
      status: true
    },
    children: [
      {
        path: 'createvendor',
        component: CreatevendorComponent
      },
      {
        path: 'createvendor/:id',
        component: CreatevendorComponent
      },
      {
        path: 'vendorlist',
        component: VendorlistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatevendorRoutingModule { }
