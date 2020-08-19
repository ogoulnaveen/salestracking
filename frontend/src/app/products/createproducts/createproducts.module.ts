import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateproductsRoutingModule } from './createproducts-routing.module';
 import {SharedModule} from '../../shared/shared.module';
 import { CreateproductsComponent } from './createproducts.component';


@NgModule({
  imports: [
    CommonModule,
    CreateproductsRoutingModule,
    SharedModule
  ],
  declarations: [CreateproductsComponent]
})
export class CreateproductsModule { }
