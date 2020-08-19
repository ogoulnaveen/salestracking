import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulevisitRoutingModule } from './schedulevisit-routing.module';
import { SchedulevisitComponent } from './schedulevisit.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SchedulevisitRoutingModule,
    SharedModule
  ],
  declarations: [SchedulevisitComponent]
})
export class SchedulevisitModule { }
