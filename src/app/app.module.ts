import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductComponent } from './product/product.component';
import {AuthInterceptor} from './Shared/interceptor/auth.interceptor';
import { SortingPipe } from './Shared/sorting.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        MainPageComponent,
        ProductPageComponent,
        CartPageComponent,
        ProductComponent,
        SortingPipe,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        QuillModule.forRoot(),
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
