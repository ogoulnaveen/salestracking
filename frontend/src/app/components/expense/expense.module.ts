import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenseRoutingModule } from './expense.routing'
import { ExpenselistComponent } from './expenselist/expenselist.component';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
  
    SharedModule,
    ExpenseRoutingModule,
    DataTableModule,
    HttpClientModule
  ],
  declarations: [
    AddexpenseComponent,
    ExpenselistComponent
  ],
})
export class ExpenseModule { }
