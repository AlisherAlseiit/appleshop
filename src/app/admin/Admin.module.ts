import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {AuthGuard} from '../Shared/guard/auth.guard';
import {AppModule} from '../app.module';
import {SearchPipe} from '../Shared/search.pipe';

@NgModule({


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([{
      path: '',
      component: AdminLayoutComponent,
      canActivateChild: [AuthGuard],
      children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
        {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
        {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
        {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
      ]
    }])
  ],
  exports: [RouterModule],

  declarations: [AdminLayoutComponent, LoginPageComponent, AddPageComponent, DashboardPageComponent, EditPageComponent, OrdersPageComponent, SearchPipe]

})


export class AdminModule{
}

