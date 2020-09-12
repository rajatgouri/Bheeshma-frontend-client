import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { homePage } from './home.page';

import { homePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    homePageRoutingModule
  ],
  declarations: [homePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class homePageModule {}
