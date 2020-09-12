import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsConditionsPage } from './terms-conditions.page';

import { TermsConditionsPageRoutingModule } from './terms-conditions-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TermsConditionsPageRoutingModule,
  ],
  declarations: [TermsConditionsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TermsConditionsPageModule {}
