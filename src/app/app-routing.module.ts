import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './Shared/main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {CartPageComponent} from './cart-page/cart-page.component';
import {AuthGuard} from './Shared/guard/auth.guard';
import {LoginComponent} from './login/login.component';
import {FacebookGuard} from './Shared/guard/facebook.guard';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, canActivate: [FacebookGuard], children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent}
    ]

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin', loadChildren: () => import('./admin/Admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
