import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterMachineComponent } from './form-register-machine.component';

const routes: Routes = [{
  path: '',
  component: FormRegisterMachineComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterMachineRoutingModule { }
