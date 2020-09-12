import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [];

if( window.innerWidth > 768) {
  routes.push({
    path: '',
    loadChildren: () => import('./desktop/tabs/tabs.module').then(m => m.TabsPageModule)
  })
} else {
  routes.push({
    path: '',
    loadChildren: () => import('./mobile/tabs/tabs.module').then(m => m.TabsPageModule)
  })
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
