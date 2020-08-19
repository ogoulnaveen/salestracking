import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserlistComponent} from './userlist.component';

const routes: Routes = [
  {
    path: '',
    component: UserlistComponent,
    data: {
      breadcrumb: 'Userlist',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserlistRoutingModule { }
