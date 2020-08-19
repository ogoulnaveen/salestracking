import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'visitmode',
      status: false
    },
    children: [
      {
        path: 'history',
        component: HistoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule { }