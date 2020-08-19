import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorlistRoutingModule} from './vendorlist-routing.module';
import { VendorlistComponent } from './vendorlist.component';
import {SharedModule} from '../../../shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    VendorlistRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [VendorlistComponent]
})
export class VendorlistModule { }
