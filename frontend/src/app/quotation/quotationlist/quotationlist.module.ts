import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationlistRoutingModule } from './quotationlist-routing.module';
 import {SharedModule} from '../../shared/shared.module';
 import { QuotationlistComponent } from './quotationlist.component';


@NgModule({
  imports: [
    CommonModule,
    QuotationlistRoutingModule,
    SharedModule
  ],
  declarations: [QuotationlistComponent]
})
export class QuotationlistModule { }
