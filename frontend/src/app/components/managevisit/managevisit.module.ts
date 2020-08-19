import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulevisitComponent } from './schedulevisit/schedulevisit.component';
import { ManagevisitsRoutingModule} from './managevisit.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AssignedvisitsComponent } from './assignedvisits/assignedvisits.component';


@NgModule({
  imports: [
  
    SharedModule,
    ManagevisitsRoutingModule,
    DataTableModule,
    HttpClientModule,
   
  ],
  declarations: [
    SchedulevisitComponent,
    AssignedvisitsComponent
    
  ],
})
export class ManagevisitModule { }
