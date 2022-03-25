import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Token } from '../_models/token';
import { catchError, take, tap, throwError } from 'rxjs';
import { CustomHttpClientService } from './custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    /* private http: CustomHttpClientService */) { }

  setBillingAddress(email: string,
    firstname: string,
    lastname: string,
    city: string,
    address: string,
    zip_postal_code: string,
    phone_number: string) {
      var json = '';
    json += '{ "first_name": "' + firstname + '",';
    json += ' "last_name": "' + lastname + '",';
    json += ' "country": "Makedonija",';
    json += ' "email": "' + email + '",';
    json += ' "city": "' + city + '",';
    json += ' "address1": "' + address + '",';
    json += ' "zip_postal_code": "' + zip_postal_code + '",';
    json += ' "phone_number": "' + phone_number + '",';
    json += '"country_id": 133 }'

      let currentUser!: Token;
      this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

      var jsonToSend = JSON.parse(json);
      
    return this.http.post<any>(this.apiUrl + 'customers/' + currentUser.customer_id + '/billingaddress/', jsonToSend);
  }

  setShippingAddress(email: string,
    firstname: string,
    lastname: string,
    city: string,
    address: string,
    zip_postal_code: string,
    phone_number: string) {
    var json = '';
    json += '{ "first_name": "' + firstname + '",';
    json += ' "last_name": "' + lastname + '",';
    json += ' "country": "Makedonija",';
    json += ' "email": "' + email + '",';
    json += ' "city": "' + city + '",';
    json += ' "address1": "' + address + '",';
    json += ' "zip_postal_code": "' + zip_postal_code + '",';
    json += ' "phone_number": "' + phone_number + '",';
    json += '"country_id": 133 }'

    let currentUser!: Token;
    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    var jsonToSend = JSON.parse(json);
    
  return this.http.post<any>(this.apiUrl + 'customers/' + currentUser.customer_id + '/shippingaddress/', jsonToSend);
}

updateCustomer(email: string,
  firstname: string,
  lastname: string,
  city: string,
  address: string,
  zip_postal_code: string,
  phone_number: string,
  password: string) {

  let currentUser!: Token;
  this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

  var ipv4 = this.getIpAddress();
  

  var json = '';
  json += '{ "customer":';
  json += '{ "first_name": "' + firstname + '",';
  json += ' "last_name": "' + lastname + '",';
  json += ' "username": "' + email + '",';
  json += ' "password": "' + password + '",';
  json += ' "customer_guid": "' + currentUser.customer_guid + '",';
  json += ' "country": "Makedonija",';

  json += ' "active": true,';
  json += ' "deleted": false,';
  json += ' "is_system_account": false,';
  json += ' "last_ip_address": "' + ipv4 + '",';

  json += ' "email": "' + email + '",';
  json += ' "city": "' + city + '",';
  json += ' "address1": "' + address + '",';
  json += ' "zip_postal_code": "' + zip_postal_code + '",';
  json += ' "phone_number": "' + phone_number + '",';
  json += '"country_id": 133,'
  json += ' "role_ids": [ 3 ],';
  json += '"id": ' + currentUser.customer_id + ' ';
  json += '} }';

  var jsonToSend = JSON.parse(json);
  
return this.http.put<any>(this.apiUrl + 'customers/' + currentUser.customer_id, jsonToSend);
}

getIpAddress() {
this.http.get<any>('https://geolocation-db.com/json/')
  .pipe(
    tap(response => {
      console.log(response);
      return response.IPv4;
    })
  )
}

getCurrentCustomer() {
  return this.http.get<any>(this.apiUrl + 'customers/me');
}

}
