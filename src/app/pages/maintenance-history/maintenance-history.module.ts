import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MaintenanceHistoryRoutingModule } from './maintenance-history-routing.module';
import { MaintenanceHistoryComponent } from './maintenance-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    MaintenanceHistoryComponent
  ],
  imports: [
    CommonModule,
    MaintenanceHistoryRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
  ]
})
export class MaintenanceHistoryModule { }
