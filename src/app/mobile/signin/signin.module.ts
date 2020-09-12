import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninPage } from './signin.page';

import { SigninPageRoutingModule } from './signin-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SigninPageRoutingModule,
  ],
  declarations: [SigninPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SigninPageModule {}
