import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceOrderComponent } from './list-service-order.component';

const routes: Routes = [{
  path: '',
  component: ListServiceOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListServiceOrderRoutingModule { }
