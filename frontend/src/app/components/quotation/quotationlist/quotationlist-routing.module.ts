import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {SimplePageComponent} from './simple-page.component';
import {QuotationlistComponent} from './quotationlist.component';


const routes: Routes = [
  {
    path: '',
    component: QuotationlistComponent,
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationlistRoutingModule { }