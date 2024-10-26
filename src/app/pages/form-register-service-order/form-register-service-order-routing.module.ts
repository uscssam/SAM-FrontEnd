import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterServiceOrderComponent } from './form-register-service-order.component';

const routes: Routes = [{
  path: '',
  component: FormRegisterServiceOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterServiceOrderRoutingModule { }
