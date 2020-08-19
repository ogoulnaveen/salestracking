import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorylistComponent } from './categorylist/categorylist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'category',
      status: false
    },
    children: [
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

export class CategoryRoutingModule { }