import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUsersRoutingModule } from './list-users-routing.module';
import { ListUsersComponent } from './list-users.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    ListUsersRoutingModule,
    MatTableModule
  ]
})
export class ListUsersModule { }
