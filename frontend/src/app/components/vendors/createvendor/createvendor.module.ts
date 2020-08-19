import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatevendorRoutingModule} from './createvendor-routing.module';
import { CreatevendorComponent } from './createvendor.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CreatevendorRoutingModule,
    SharedModule
  ],
  declarations: [CreatevendorComponent]
})
export class CreatevendorModule { }
