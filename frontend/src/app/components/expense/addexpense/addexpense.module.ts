import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddexpenseRoutingModule } from './addexpense-routing.module';
import { AddexpenseComponent } from './addexpense.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AddexpenseRoutingModule,
    SharedModule
  ],
  declarations: [AddexpenseComponent]
})
export class AddexpenseModule { }
