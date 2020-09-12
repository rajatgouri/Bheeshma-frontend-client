import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';
import { AuthguardService } from 'src/app/guards/authguard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthguardService],
    component: AccountPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class searchPageRoutingModule {}
