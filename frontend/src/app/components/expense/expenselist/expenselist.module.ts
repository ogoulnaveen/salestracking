import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenselistRoutingModule } from './expenselist-routing.module';
import { ExpenselistComponent } from './expenselist.component';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ExpenselistRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [ExpenselistComponent]
})
export class ExpenselistModule { }
