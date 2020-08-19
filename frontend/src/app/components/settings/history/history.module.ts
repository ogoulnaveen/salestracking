import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule
  ],
  providers:[DatePipe],
  declarations: [HistoryComponent]
})
export class HistoryModule { }
