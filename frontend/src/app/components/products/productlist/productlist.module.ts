import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductlistRoutingModule } from './productlist-routing.module';
import { ProductlistComponent } from './productlist.component';
import {SharedModule} from '../../../shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    ProductlistRoutingModule,
    SharedModule,
    DataTableModule
    
  ],
  declarations: [ProductlistComponent]
})
export class ProductlistModule { }
