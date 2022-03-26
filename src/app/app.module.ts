import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" 
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { CookieModule } from 'ngx-cookie';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './shared/_services/token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/_interceptor/loading.interceptor';
import { ServerStateInterceptor } from './shared/_interceptor/server-state.interceptor';
import { BrowserStateInterceptor } from './shared/_interceptor/browser-state.interceptor';
import { CustomHttpClientService } from './shared/_services/custom-http-client.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    TokenService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true
    }, */
    CustomHttpClientService,
    /* {
      provide: UrlSerializer,
      useFactory: urlSerializerFactory,
      deps: [PLATFORM_ID]
    } */
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
