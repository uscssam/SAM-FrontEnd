import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'form-register',
    loadChildren: () => import('./pages/form-register/form-register.module').then(m => m.FormRegisterModule) 
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages/list-users/list-users.module').then(m => m.ListUsersModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
