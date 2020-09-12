import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordPage } from './change-password.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordPageRoutingModule {}
