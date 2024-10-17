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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
