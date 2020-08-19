import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatequotationComponent } from './createquotation/createquotation.component';
import { QuotationlistComponent} from './quotationlist/quotationlist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'quotation',
      status: false
    },
    children: [
      {
        path: 'createquotation',
        component: CreatequotationComponent
      },
      {
        path: 'createquotation/:id',
        component: CreatequotationComponent
      },
      {
        path: 'quotationlist',
        component: QuotationlistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateqotationRoutingModule { }
