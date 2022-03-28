import { Observable, take } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Token } from '../_models/token';
import { TokenService } from '../_services/token.service';
import { DOCUMENT } from '@angular/common';
import { CookieManagerService } from '../_services/cookie-manager.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService,
    private cookieService: CookieService
    /* @Inject(DOCUMENT) private document: Document,
    private cookieManager: CookieManagerService */) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookieService.hasKey('access_token') && this.cookieService.get('access_token') != null && this.cookieService.get('access_token') != undefined && this.cookieService.get('access_token') != '') {
      let access_token!: string;
      access_token = this.cookieService.get('access_token');

      if (access_token) {
        console.log('Bearer ' + access_token);
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + access_token
          }
        });
      }
    }
      
    return next.handle(request);
  }
}
