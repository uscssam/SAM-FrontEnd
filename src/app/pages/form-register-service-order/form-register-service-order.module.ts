import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRegisterServiceOrderRoutingModule } from './form-register-service-order-routing.module';
import { FormRegisterServiceOrderComponent } from './form-register-service-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    FormRegisterServiceOrderComponent
  ],
  imports: [
    CommonModule,
    FormRegisterServiceOrderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
    
  ]
})
export class FormRegisterServiceOrderModule { }
