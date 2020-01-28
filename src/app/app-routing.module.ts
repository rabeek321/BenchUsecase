import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./components/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'search',
    loadChildren: () => import(`./components/search/search.module`).then(m => m.SearchModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction',
    loadChildren: () => import(`./components/transaction/transaction.module`).then(m => m.TransactionModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'myorders',
    loadChildren: () => import(`./components/myorders/myorders.module`).then(m => m.MyordersModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
