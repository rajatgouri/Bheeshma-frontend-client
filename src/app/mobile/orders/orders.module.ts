import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersPage } from './orders.page';

import { OrdersPageRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    OrdersPageRoutingModule,
  ],
  declarations: [OrdersPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OrdersPageModule {}
