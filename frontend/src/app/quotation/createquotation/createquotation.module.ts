import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatequotationRoutingModule } from './createquotation-routing.module';
 import {SharedModule} from '../../shared/shared.module';
 import { CreatequotationComponent } from './createquotation.component';


@NgModule({
  imports: [
    CommonModule,
    CreatequotationRoutingModule,
    SharedModule
  ],
  declarations: [CreatequotationComponent]
})
export class CreatequotatioModule { }
