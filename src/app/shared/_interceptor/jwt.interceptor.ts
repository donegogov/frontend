import { Observable, take } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../_models/token';
import { TokenService } from '../_services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser!: Token;

    this._tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    console.log('currentUser');
    console.log(currentUser);
    if (currentUser) {
      console.log(`Bearer ${currentUser.access_token}`);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      });
    }


    return next.handle(request);
  }
}