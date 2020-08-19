import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddvisitRoutingModule } from './addvisit-routing.module';
import { AddvisitComponent } from './addvisit.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    AddvisitRoutingModule,
    SharedModule
  ],
  declarations: [AddvisitComponent]
})
export class AddvisitModule { }
