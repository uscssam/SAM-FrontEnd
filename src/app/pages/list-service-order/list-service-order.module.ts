import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ListServiceOrderRoutingModule } from './list-service-order-routing.module';
import { ListServiceOrderComponent } from './list-service-order.component';
import { DialogEditOrderComponent } from './dialog-edit-order/dialog-edit-order.component';


@NgModule({
  declarations: [
    ListServiceOrderComponent,
  ],
  imports: [
    CommonModule,
    ListServiceOrderRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ]
})
export class ListServiceOrderModule { }
