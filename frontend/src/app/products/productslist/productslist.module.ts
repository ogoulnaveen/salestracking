import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductslistRoutingModule } from './productslist-routing.module';
 import {SharedModule} from '../../shared/shared.module';
 import { ProductslistComponent } from './productslist.component';


@NgModule({
  imports: [
    CommonModule,
    ProductslistRoutingModule,
    SharedModule
  ],
  declarations: [ProductslistComponent]
})
export class ProductslistModule { }
