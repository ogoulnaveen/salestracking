import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserlistRoutingModule } from './userlist-routing.module';
 import {SharedModule} from '../../shared/shared.module';
 import { UserlistComponent } from './userlist.component';


@NgModule({
  imports: [
    CommonModule,
    UserlistRoutingModule,
    SharedModule
  ],
  declarations: [UserlistComponent]
})
export class userlistModule { }
