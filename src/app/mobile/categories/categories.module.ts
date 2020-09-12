import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { categoriesPage } from './categories.page';

import { categoriesPageRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    categoriesPageRoutingModule
  ],
  declarations: [categoriesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class categoriesPageModule {}
