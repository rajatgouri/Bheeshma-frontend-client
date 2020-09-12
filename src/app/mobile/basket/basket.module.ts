import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasketPage } from './basket.page';

import { BasketPageRoutingModule } from './basket-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    BasketPageRoutingModule,
  ],
  declarations: [BasketPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BasketPageModule {}
