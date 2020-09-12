import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { searchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: searchPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class searchPageRoutingModule {}
