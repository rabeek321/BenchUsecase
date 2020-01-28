import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import(`./components/dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
