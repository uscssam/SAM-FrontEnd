import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterUnitComponent } from './form-register-unit.component';

const routes: Routes = [{
  path: '',
  component: FormRegisterUnitComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterUnitRoutingModule { }
