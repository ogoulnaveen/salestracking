import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdduserComponent} from './adduser.component';

const routes: Routes = [
  {
    path: '',
    component: AdduserComponent,
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
export class AdduserRoutingModule { }
