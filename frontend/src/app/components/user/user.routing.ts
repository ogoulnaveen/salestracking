import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UserlistComponent } from './userlist/userlist.component';
import {AddusertypeComponent} from './addusertype/addusertype.component';
import{UsertypelistComponent} from './usertypelist/usertypelist.component'
const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'user',
      status: false
    },
    children: [
      {
        path: 'adduser',
        component: AdduserComponent
      },
      {
        path: 'adduser/:id',
        component: AdduserComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      },
      {
        path: 'addusertype/:id',
        component: AddusertypeComponent 

      },
      {
        path: 'addusertype',
        component: AddusertypeComponent 

      },
      {
        path: 'usertypelist',
        component: UsertypelistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }