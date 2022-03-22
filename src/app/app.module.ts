import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" 
import { APP_INITIALIZER } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './shared/_services/token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/_interceptor/jwt.interceptor';
import { LoadingInterceptor } from './shared/_interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HomeModule,
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
    BrowserTransferStateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    TokenService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: TokenService) => () => { return ds.getToken() },
      deps: [TokenService],
      multi: true
      
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
