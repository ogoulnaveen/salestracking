import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddvisitComponent } from './addvisit/addvisit.component';
import { VisitRoutingModule } from './visitmode.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

import {AgmCoreModule, AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
import { SearchvisitsComponent } from './searchvisits/searchvisits.component';  
//import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  imports: [
  
    SharedModule,
    VisitRoutingModule,
    DataTableModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhFzy3EwbidUdK98BWrSs6lNECgT6h3MM'
    }),
    //DpDatePickerModule
  ],
  declarations: [
    AddvisitComponent,
    SearchvisitsComponent
    
  ],
})
export class VisitmodeModule { }
