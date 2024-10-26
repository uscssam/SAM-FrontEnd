import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceHistoryComponent } from './maintenance-history.component';

const routes: Routes = [{
  path:  '',
  component: MaintenanceHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceHistoryRoutingModule { }
