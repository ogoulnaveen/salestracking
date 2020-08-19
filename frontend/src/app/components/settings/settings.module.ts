import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryComponent } from './history/history.component';
import { SettingsRoutingModule } from './settings.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

import {AgmCoreModule, AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
//import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  imports: [
  
    SharedModule,
    SettingsRoutingModule,
    DataTableModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhFzy3EwbidUdK98BWrSs6lNECgT6h3MM'
    }),
    //DpDatePickerModule
  ],
  declarations: [
    HistoryComponent,
    
  ],
})
export class SettingsModule { }
