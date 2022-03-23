import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Token } from '../_models/token';
import { CookieManagerService } from './cookie-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<Token>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,
    private cookieService: CookieService
    /* @Inject(DOCUMENT) private document: Document,
    private cookieManager: CookieManagerService */) { }

  getToken(guest: boolean = true, remember_me: boolean = true, username: string = 'username', password: string = 'password'){
    if (typeof window !== 'undefined') {
    if (localStorage.getItem('user') != null && localStorage.getItem('user') != '') {
      var token = JSON.parse(localStorage.getItem('user') || '');
      if (this.checkToken(token.access_token)) {
        this.setCurrentUser(token);
        /* this.saveInCookies('user', token); */
        this.cookieService.put('user', JSON.stringify(token));
        this.cookieService.put('token', JSON.stringify(token.access_token));
        return;
      }
    }
  }
    let json = '';
    json += '{ "guest":"' + guest.toString() + '",';
    json += '"remember_me":"' + remember_me.toString() + '",';
    json += '"username":"' + username + '",';
    json += '"password":"' + password + '" }';

    json = JSON.parse(json);

  return this.http.post<Token>(this.apiUrl + 'token', json).toPromise()
  .then(
    data => {
      if (data) {
        console.log('TOKEN TOKEN TOKEN TOKEN TOKEN TOKEN TOKEN');
        console.log(data);
        if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
        }
        this.setCurrentUser(data);
        /* this.saveInCookies('user', data); */
          this.cookieService.put('user', JSON.stringify(data));
          this.cookieService.put('token', data.access_token);
        //onsole.log(this.cookieService.get('tokem'));
        console.log('tokemtokemtokemtokemtokemtokemtokemtokemtokemtokemtokem');
      }
    }
  );
  }

  unsubscribe() {
    this.currentUserSource.unsubscribe();
  }

  setCurrentUser(user: Token) {
    this.currentUserSource.next(user);
  }

  //decode token, tokenExpiryDate is how much seconds are after 1970 01 01 00:00:00, now_utc is how much milliseconds are after 1970,
  //diff is calculated via difference between tokenExpiryDate and now_utc divided with 1000 because is in milliseconds and needs to convert to seconds
  //so tokenExpiryDate and now_utc are both in seconds, and if diff is larger than zero that means that there are still time in the token
  //to expiry 
  checkToken(token: any): boolean {
    var decodeToken = JSON.parse(atob(token.split('.')[1]));
    //console.log('decodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeTokendecodeToken');
    //console.log(decodeToken);
    //var date1970 = new Date('1970-01-01T00:00:00');
    var tokenExpiryDate = parseInt(decodeToken.exp);
    var date = new Date(); 
    var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    var diff = tokenExpiryDate - now_utc/1000;
    console.log('datedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedatedate');
    console.log(diff);
    //console.log(now_utc);
    //console.log(tokenExpiryDate);
    if (diff > 60 * 60 * 24) {
      return true;
    }

    return false;
    /* this.http.get(this.apiUrl + 'token/check', { observe: 'response' }).subscribe(
      (res) => {
        console.log('resresresresresresresresresresresresresresresresresresresresres');
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          return true;
        }
        return false;
    }, (err) => {
        console.log('errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr');
        console.log(err);
    });
    return false;
  } */
  }

  /* public saveInCookies(key: any, data: any){
    if (typeof window !== 'undefined') {
      let cookieStorage = this.cookieManager.getItem(this.document.cookie, 'user');
      var cookieStorageJson = JSON.parse(cookieStorage || '{ }');
      cookieStorageJson[key] = data;
      this.document.cookie = this.cookieManager.setItem(this.document.cookie, 'user', JSON.stringify(cookieStorageJson));
    }
} */
}