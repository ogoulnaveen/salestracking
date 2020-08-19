import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {SimplePageComponent} from './simple-page.component';
import {CreateproductsComponent} from './createproducts.component';


const routes: Routes = [
  {
    path: '',
    component: CreateproductsComponent,
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateproductsRoutingModule { }