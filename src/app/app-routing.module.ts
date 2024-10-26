import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'form-register-user',
    loadChildren: () => import('./pages/form-register-user/form-register-user.module').then(m => m.FormRegisterUserModule),
    canActivate: [roleGuard]
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages/list-users/list-users.module').then(m => m.ListUsersModule),
    canActivate: [roleGuard]
  },
  {
    path: 'form-register-machine',
    loadChildren: () => import('./pages/form-register-machine/form-register-machine.module').then(m => m.FormRegisterMachineModule),
    canActivate: [roleGuard]
  },
  {
    path: 'list-machines',
    loadChildren: () => import('./pages/list-machines/list-machines.module').then(m => m.ListMachinesModule),
    canActivate: [roleGuard]
  },
  {
    path: 'form-register-service-order',
    loadChildren: () => import('./pages/form-register-service-order/form-register-service-order.module').then(m => m.FormRegisterServiceOrderModule),
    canActivate: [roleGuard]
  },
  {
    path: 'list-service-order',
    loadChildren: () => import('./pages/list-service-order/list-service-order.module').then(m => m.ListServiceOrderModule),
    canActivate: [roleGuard]
  },
  {
    path: 'maintenance-history',
    loadChildren: () => import('./pages/maintenance-history/maintenance-history.module').then(m => m.MaintenanceHistoryModule),
    canActivate: [roleGuard]
  },
  {
    path: 'form-register-unit',
    loadChildren: () => import('./pages/form-register-unit/form-register-unit.module').then(m => m.FormRegisterUnitModule),
    canActivate: [roleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
