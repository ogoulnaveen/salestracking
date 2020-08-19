import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicRegComponent } from './basic-reg.component';
import {BasicRegRoutingModule} from './basic-reg-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BasicRegRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BasicRegComponent]
})
export class BasicRegModule { }
