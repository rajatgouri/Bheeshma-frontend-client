import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { categoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: categoriesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class categoriesPageRoutingModule {}
