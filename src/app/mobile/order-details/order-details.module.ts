import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailsPage } from './order-details.page';

import { OrderDetailsPageRoutingModule } from './order-details-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    OrderDetailsPageRoutingModule,
  ],
  declarations: [OrderDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OrderDetailsPageModule {}
