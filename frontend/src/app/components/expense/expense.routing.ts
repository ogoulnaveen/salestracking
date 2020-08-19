import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenselistComponent } from './expenselist/expenselist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'expense',
      status: false
    },
    children: [
      {
        path: 'addexpense',
        component: AddexpenseComponent
      },
      {
        path: 'addexpense/:id',
        component: AddexpenseComponent
      },
      {
        path: 'expenselist',
        component: ExpenselistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExpenseRoutingModule { }