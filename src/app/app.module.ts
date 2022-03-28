import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" 
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { CookieModule } from 'ngx-cookie';
/* import { HashLocationStrategy, LocationStrategy } from '@angular/common'; */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './shared/_services/token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/_interceptor/loading.interceptor';
import { ServerStateInterceptor } from './shared/_interceptor/server-state.interceptor';
import { BrowserStateInterceptor } from './shared/_interceptor/browser-state.interceptor';
import { CustomHttpClientService } from './shared/_services/custom-http-client.service';
import { TestComponent } from './shared/test/test.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProductsService } from './shared/_services/products.service';
import { SearchProductResolver } from './shared/_resolvers/search-product.resolver';
import { CookieManagerService } from './shared/_services/cookie-manager.service';
import { CustomerService } from './shared/_services/customer.service';
import { OrderService } from './shared/_services/order.service';
import { JwtInterceptor } from './shared/_interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
    }),
    /* BrowserTransferStateModule, */
    CookieModule.forRoot(),
    AppRoutingModule,
    BrowserTransferStateModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    TokenService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true
    },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
