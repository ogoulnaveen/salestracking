import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateproductRoutingModule } from './createproduct-routing.module';
import { CreateproductComponent } from './createproduct.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CreateproductRoutingModule,
    SharedModule
  ],
  declarations: [CreateproductComponent]
})
export class CreateproductModule { }
