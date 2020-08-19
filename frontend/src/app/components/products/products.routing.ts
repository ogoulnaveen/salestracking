import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import{CategoryaddComponent} from './categoryadd/categoryadd.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'products',
      status: true
    },
    children: [
      {
        path: 'createproduct',
        component: CreateproductComponent
      },
      {
        path: 'createproduct/:id',
        component: CreateproductComponent
      },
      {
        path: 'productlist',
        component: ProductlistComponent
      },
    
      {
        path: 'categoryadd',
        component: CategoryaddComponent
      },
      {
        path: 'categoryadd/:id',
        component: CategoryaddComponent
      },
      {
        path: 'categorylist',
        component: CategorylistComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
