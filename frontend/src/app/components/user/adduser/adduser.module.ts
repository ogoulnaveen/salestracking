import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserRoutingModule } from './adduser-routing.module';
import { AdduserComponent } from './adduser.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdduserRoutingModule,
    SharedModule
  ],
  declarations: [AdduserComponent]
})
export class AdduserModule { }
