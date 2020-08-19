import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    AttendanceListRoutingModule,
    SharedModule
  ],
  providers:[DatePipe],
  declarations: [AttendanceListComponent]
})
export class AttendanceListModule { }
