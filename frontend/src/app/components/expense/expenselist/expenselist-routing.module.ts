import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpenselistComponent} from './expenselist.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenselistComponent,
    data: {
      breadcrumb: 'Expenselist',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenselistRoutingModule { }
