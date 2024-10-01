import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterUserComponent } from './form-register-user.component';

const routes: Routes = [{
  path: '',
  component: FormRegisterUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterUserRoutingModule { }
