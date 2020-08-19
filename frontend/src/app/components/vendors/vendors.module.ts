import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreatevendorRoutingModule} from './vendors.routing';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { CreatevendorComponent } from './createvendor/createvendor.component';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
  
    SharedModule,
    CreatevendorRoutingModule,
    DataTableModule
  ],
  declarations: [
   
    CreatevendorComponent,
    VendorlistComponent
  ],
})
export class VendorModule { }
