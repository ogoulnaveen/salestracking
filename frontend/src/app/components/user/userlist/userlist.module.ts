import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserlistRoutingModule } from './userlist-routing.module';
import { UserlistComponent } from './userlist.component';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UserlistRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [UserlistComponent]
})
export class UserlistModule { }
