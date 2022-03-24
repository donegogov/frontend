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
    /* let access_token!: string;
    if (typeof window !== 'undefined') {
      access_token = JSON.parse(localStorage.getItem('user') || '{ }').access_token;
      this.cookieService.put('user', JSON.parse(localStorage.getItem('user') || '{ }'))
    } else if (typeof window === 'undefined') {
      access_token = this.cookieService.get('customer_id');
    }  */
    //request.body.cookieStorage
    //let currentUser!: Token;
    
    /* this._tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if (!(typeof window !== 'undefined')) {
      console.log('console.log(this.cookieService.get(user));console.log(this.cookieService.get(user));console.log(this.cookieService.get(user));');
      //console.log(this.cookieService.get('user'));
      //console.log(this.cookieService.get('token'));
    } */
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


    return next.handle(request);
  }
}
