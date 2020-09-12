import { IonicModule, NavParams } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryPage } from './category.page';

import { CategoryPageRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    CategoryPageRoutingModule,
  ],
  declarations: [CategoryPage],
  providers: [NavParams]
})
export class CategoryPageModule {}
