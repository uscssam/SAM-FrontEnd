import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMachinesComponent } from './list-machines.component';

const routes: Routes = [{
  path: '',
  component: ListMachinesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMachinesRoutingModule { }
