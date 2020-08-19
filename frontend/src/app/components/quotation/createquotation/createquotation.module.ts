import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatequotationRoutingModule } from './createquotation-routing.module';
 import {SharedModule} from '../../../shared/shared.module';
 import { CreatequotationComponent } from './createquotation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CreatequotationRoutingModule,
    SharedModule,
    FormsModule,
    
  ],
  declarations: [CreatequotationComponent],
  
})
export class CreatequotatioModule { }
