import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Token } from '../_models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<Token>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  getToken(guest: boolean = true, remember_me: boolean = true, username: string = 'username', password: string = 'password'){
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
        localStorage.setItem('user', JSON.stringify(data));
        this.setCurrentUser(data);
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
}
