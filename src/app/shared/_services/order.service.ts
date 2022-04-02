import { Observable, take } from 'rxjs';
import { CartService } from 'src/app/shared/_services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CustomerService } from './customer.service';
import { Token } from '../_models/token';
import { TokenService } from './token.service';
import { CookieManagerService } from './cookie-manager.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private cartService: CartService,
    private customerService: CustomerService,
    private tokenService: TokenService,
    private cookieService: CookieService,
    private router: Router
    /* @Inject(DOCUMENT) private document: Document,
    private cookieManager: CookieManagerService */) { }

    setOrder(): any {
      this.customerService.getCurrentCustomer().subscribe((dataCurrentCustomer: any) => {
        if (dataCurrentCustomer) {
          this.cartService.getShoppingCartItems().subscribe((dataShoppingCartItems: any) => {
              return this.setOrderWithData(dataCurrentCustomer, dataShoppingCartItems);
          });
        }
      });
    }

    setOrderWithData(currentCustomer: any, shoppingCartItems: any): any {
      console.log(currentCustomer.customers[0].shipping_address);
      console.log(shoppingCartItems);
      var json = '{ ';
      json += '"order": { "pick_up_in_store": false, "payment_method_system_name": "Payments.CashOnDelivery", "shipping_method": "Kargo", "deleted": false,  "order_status": "Pending", "payment_status": "Pending", "shipping_status": "ShippingNotRequired", ';
      json += '"customer_ip": "' + this.customerService.getIpAddress() + '",';
      json += '"customer_id": ' + currentCustomer.customers[0].id + ',';

      json += '"shipping_address": { ';
      json += ' "first_name": "' + currentCustomer.customers[0].shipping_address.first_name + '",';
      json += ' "last_name": "' + currentCustomer.customers[0].shipping_address.last_name + '",';
      json += ' "email": "' + currentCustomer.customers[0].shipping_address.email + '",';
      json += ' "country_id": 133,';
      json += ' "country": "Makedonija",';
      json += ' "city": "' + currentCustomer.customers[0].shipping_address.city + '",';
      json += ' "address1": "' + currentCustomer.customers[0].shipping_address.address1 + '",';
      json += ' "zip_postal_code": "' + currentCustomer.customers[0].shipping_address.zip_postal_code + '",';
      json += ' "phone_number": "' + currentCustomer.customers[0].shipping_address.phone_number + '",';
      json += ' "id": ' + currentCustomer.customers[0].shipping_address.id + ' ';
      json += ' }, ';

      json += ' "order_items": [ '

      shoppingCartItems.shopping_carts.forEach((elementShoppingCartItem: any, i: number) => {
        json += '{ ';
        json += ' "quantity": ' + elementShoppingCartItem.quantity + ', ';
        json += ' "product_id": ' + elementShoppingCartItem.product_id + ', ';
        console.log('shoppingCartItems.shopping_carts.forEach((elementShoppingCartItem: any, i: number) => {');
        console.log(elementShoppingCartItem);
        console.log(elementShoppingCartItem.quantity);
        json += ' "product_attributes": [ ';

        if ( elementShoppingCartItem.product_attributes > 0) {
          elementShoppingCartItem.product_attributes.forEach((elementProductAttributes: any, i: number) => {
            json += ' { ';
            json += '"value": "' + elementProductAttributes.value + '", '
            json += '"id": ' + elementProductAttributes.id + '  },';
          });
          json += json.slice(0, -1);
        } else {
          json += ' { "value": "0", "id": 0 } ';
        }
        json += ' ] } ';
      });
        json += ' ] '
       json += ' } }';
       console.log(json);
       var error = json.substring(697, 707);
       console.log(error);

       json = JSON.parse(json);
       console.log(json);

       
            this.cartService.deleteShoppingCart().subscribe((dataCart: any) => {
              console.log(dataCart);
              this.http.post<any>(this.apiUrl + 'orders', json).subscribe((dataOrder: any) => {
                console.log('ORDERORDERORDERORDERORDERORDERORDERORDERORDERORDERORDERORDER');
                console.log(dataOrder);
               if (dataOrder) {
                   console.log('dataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrder'); 
                   console.log(dataOrder);
                   this.router.navigate(['pages/thanks']);
               }
              
              });
            
        });
        
      }

    getOrdersForCustomer() {
      /* let currentUser!: Token;

      this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user); */
      /* let currentUser!: Token;
    if (typeof window == 'undefined') {
      currentUser = JSON.parse(this.cookieManager.getItem(this.document.cookie, 'user') || '{ }');
    } else if (typeof window !== 'undefined') {
      currentUser = JSON.parse(localStorage.getItem('user') || '');
    } */
    var CustomerId = this.cookieService.get('customer_id');

      return this.http.get<any>(this.apiUrl + 'orders/customer/' + CustomerId);
    }

}

357