import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordPage } from './change-password.page';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ChangePasswordPageRoutingModule,
  ],
  declarations: [ChangePasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ChangePasswordPageModule {}
