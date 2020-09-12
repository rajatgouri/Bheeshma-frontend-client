import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then(m => m.categoriesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'category/:name',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../product/product.module').then(m => m.ProductPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('../basket/basket.module').then(m => m.BasketPageModule)
      },
      {
        path: 'order-details/:id',
        loadChildren: () => import('../order-details/order-details.module').then(m => m.OrderDetailsPageModule)
      },
      {
        path: 'terms-conditions',
        loadChildren: () => import('../terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../signin/signin.module').then(m => m.SigninPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: 'update-account/:mode',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: 'forget-password',
        loadChildren: () => import('../forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../change-password/change-password.module').then(m => m.ChangePasswordPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
