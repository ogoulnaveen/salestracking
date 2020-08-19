import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products.routing';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { DataTableModule } from 'angular-6-datatable';
import { CategoryaddComponent } from './categoryadd/categoryadd.component';
@NgModule({
  imports: [
  
    SharedModule,
    ProductsRoutingModule,
    DataTableModule
  ],
  declarations: [
   
    CreateproductComponent,
    ProductlistComponent,
    CategoryaddComponent,
    CategorylistComponent
  ],
})
export class ProductsModule { }
