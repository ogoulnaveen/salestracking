import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttendanceLoginComponent } from './attendance-login/attendance-login.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';

import { AttendanceRoutingModule } from './attendance.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

import {AgmCoreModule, AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
//import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  imports: [
  
    SharedModule,
    AttendanceRoutingModule,
    DataTableModule,
    HttpClientModule,
    
    //DpDatePickerModule
  ],
  declarations: [
    AttendanceLoginComponent,
    AttendanceListComponent,
  ],
})
export class AttendanceModule { }
