import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupPage } from './signup.page';

import { SignupPageRoutingModule } from './signup-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SignupPageRoutingModule,
  ],
  declarations: [SignupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SignupPageModule {}
