import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { CategoryRoutingModule } from './category.routing'
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
  
    SharedModule,
    CategoryRoutingModule,
    DataTableModule,
    HttpClientModule
    
  ],
  declarations: [
CategorylistComponent 

    
  ],
})
export class CategoryModule { }
