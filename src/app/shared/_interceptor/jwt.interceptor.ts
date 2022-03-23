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
    /* let currentUser!: Token;
    if (typeof window === 'undefined' && this.document) {
      currentUser = JSON.parse(this.cookieManager.getItem(this.document.cookie, 'user') || '{ }');
    } else if (typeof window !== 'undefined') {
      currentUser = JSON.parse(localStorage.getItem('user') || '');
      this._tokenService.saveInCookies('user', JSON.parse(localStorage.getItem('user') || '{ }'))
    } */
    //request.body.cookieStorage
    let currentUser!: Token;
    
    this._tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if (!(typeof window !== 'undefined')) {
      console.log('console.log(this.cookieService.get(user));console.log(this.cookieService.get(user));console.log(this.cookieService.get(user));');
      //console.log(this.cookieService.get('user'));
      //console.log(this.cookieService.get('token'));
    }
    if (this.cookieService.hasKey('token')) {
      console.log('Bearer ' + this.cookieService.get('token'));
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.cookieService.get('token')
        }
      });
    }


    return next.handle(request);
  }
}
