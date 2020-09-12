import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [HeaderComponent, LoaderComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, LoaderComponent, ModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
