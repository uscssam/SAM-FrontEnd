import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMachinesRoutingModule } from './list-machines-routing.module';
import { ListMachinesComponent } from './list-machines.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ListMachinesComponent
  ],
  imports: [
    CommonModule,
    ListMachinesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ]
})
export class ListMachinesModule { }
