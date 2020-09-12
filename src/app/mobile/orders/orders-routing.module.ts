import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersPageRoutingModule {}
