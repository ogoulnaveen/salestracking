import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './gaurds/auth.gaurd'

const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'basic',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'forms',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/forms/basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      }, {
        path: 'bootstrap-table',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        canActivate: [AuthGuard],
        loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'simple-page',
        canActivate: [AuthGuard],
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      {
        path: 'createusers',
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/createusers/createusers.module').then(m => m.CreateusersModule)
      }
      ,
      {
        path: 'userslist',
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/userlist/userlist.module').then(m => m.userlistModule)
      }

      ,
      {
        path: 'createproducts',
        canActivate: [AuthGuard],
        loadChildren: () => import('./products/createproducts/createproducts.module').then(m => m.CreateproductsModule)
      }
      ,
      {
        path: 'productslist',
        canActivate: [AuthGuard],
        loadChildren: () => import('./products/productslist/productslist.module').then(m => m.ProductslistModule)
      }
      ,
      {
        path: 'createquotation',
        canActivate: [AuthGuard],
        loadChildren: () => import('./quotation/createquotation/createquotation.module').then(m => m.CreatequotatioModule)
      }
      ,
      {
        path: 'quotationlist',
        canActivate: [AuthGuard],
        loadChildren: () => import('./quotation/quotationlist/quotationlist.module').then(m => m.QuotationlistModule)
      },

      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'attendance',
        loadChildren: () => import('./components/attendance/attendance.module').then(m => m.AttendanceModule)
      },
      {
        path: 'attendancelogin',
        loadChildren: () => import('./components/attendance/attendance-login/attendance-login.module').then(m => m.AttendanceLoginModule)
      },
      {
        path: 'attendancelist',
        loadChildren: () => import('./components/attendance/attendance-list/attendance-list.module').then(m => m.AttendanceListModule)
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'quotation',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/quotation/quotation.module').then(m => m.CreatequotationModule)
      },
      {
        path: 'vendors',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/vendors/vendors.module').then(m => m.VendorModule)
      },
      {
        path: 'visitmode',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/visitmode/visitmode.module').then(m => m.VisitmodeModule)
      },
      {
        path: 'expense',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/expense/expense.module').then(m => m.ExpenseModule)
      },
      {
        path: 'managevisit',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/managevisit/managevisit.module').then(m => m.ManagevisitModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
      },
      /*  {
         path: 'category',
         loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)  }, */
    ]
  },
  {
    path: '',
    component: AuthComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
