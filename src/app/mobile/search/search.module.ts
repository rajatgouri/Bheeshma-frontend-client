import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { searchPage } from './search.page';

import { searchPageRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    searchPageRoutingModule,
  ],
  declarations: [searchPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SearchPageModule {}
