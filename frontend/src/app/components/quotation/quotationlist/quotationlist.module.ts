import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationlistRoutingModule } from './quotationlist-routing.module';
 import {SharedModule} from '../../../shared/shared.module';
 import { QuotationlistComponent } from './quotationlist.component';

 import { DataTableModule } from 'angular-6-datatable';

 
@NgModule({
  imports: [
    CommonModule,
    QuotationlistRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [QuotationlistComponent]
})
export class QuotationlistModule { }
