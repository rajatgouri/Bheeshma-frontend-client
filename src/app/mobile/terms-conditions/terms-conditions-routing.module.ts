import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditionsPage } from './terms-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsConditionsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsPageRoutingModule {}
