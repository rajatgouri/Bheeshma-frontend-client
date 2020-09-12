import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketPage } from './basket.page';
import { AuthguardService } from 'src/app/guards/authguard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthguardService],
    component: BasketPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketPageRoutingModule {}
