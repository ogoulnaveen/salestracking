import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {SimplePageComponent} from './simple-page.component';
import {CreateusersComponent} from './createusers.component';


const routes: Routes = [
  {
    path: '',
    component: CreateusersComponent,
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateusersRoutingModule { }