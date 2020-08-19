import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdduserComponent } from './adduser/adduser.component';
import { UserRoutingModule } from './user.routing'
import { UserlistComponent } from './userlist/userlist.component';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AddusertypeComponent } from './addusertype/addusertype.component';
import { UsertypelistComponent } from './usertypelist/usertypelist.component';

@NgModule({
  imports: [
  
    SharedModule,
    UserRoutingModule,
    DataTableModule,
    HttpClientModule
  ],
  declarations: [
    AdduserComponent,
    UserlistComponent,
    AddusertypeComponent,
    UsertypelistComponent
  ],
})
export class UserModule { }
