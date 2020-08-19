import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceLoginRoutingModule } from './attendance-login-routing.module';
import { AttendanceLoginComponent } from './attendance-login.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    AttendanceLoginRoutingModule,
    SharedModule
  ],
  providers:[DatePipe],
  declarations: [AttendanceLoginComponent]
})
export class AttendanceLoginModule { }
