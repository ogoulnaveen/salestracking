import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateusersRoutingModule } from './createusers-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateusersComponent } from './createusers.component';


@NgModule({
  imports: [
    CommonModule,
    CreateusersRoutingModule,
    SharedModule
  ],
  declarations: [CreateusersComponent]
})
export class CreateusersModule { }
