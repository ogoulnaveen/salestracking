import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorylistRoutingModule } from './categorylist-routing.module';
import { CategorylistComponent} from './categorylist.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategorylistRoutingModule,
    SharedModule
  ],
  declarations: [CategorylistComponent]
})
export class CategorylistModule { }
