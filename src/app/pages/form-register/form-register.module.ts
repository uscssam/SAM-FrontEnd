import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormRegisterRoutingModule } from './form-register-routing.module';
import { FormRegisterComponent } from './form-register.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    FormRegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class FormRegisterModule { }
