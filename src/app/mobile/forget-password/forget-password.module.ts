import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordPage } from './forget-password.page';

import { ForgetPasswordPageRoutingModule } from './forget-password-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ForgetPasswordPageRoutingModule,
  ],
  declarations: [ForgetPasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ForgetPasswordPageModule {}
