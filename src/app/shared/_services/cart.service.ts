import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { productAttributeIdAttributeValuesId } from '../_models/product-attribute-id-attribute-values-id';
import { Token } from '../_models/token';
import { CookieManagerService } from './cookie-manager.service';
import { CustomHttpClientService } from './custom-http-client.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private httpGet: CustomHttpClientService,
    @Inject(DOCUMENT) private document: Document,
    private cookieManager: CookieManagerService) { }

  addToWishListOrCart(attributeIdAttributeValueId: productAttributeIdAttributeValuesId[],
    quantity: string,
    cartOrWishList: string,
    product_id: string) {
    //kreiram json spored add to cart preku veb stranita swager api vie polinja gi popolniv i se kreirase add to cart
    let json = '';
    json += '{ "shopping_cart_item": { "product_attributes": [';

    //gi dodavame attribute values
    if(attributeIdAttributeValueId.length > 0) {
      attributeIdAttributeValueId.forEach(element => {
        json += '{ "value": "' + element.value +'", "id": ' + element.key + ' },';
      });
      json = json.slice(0, -1);
    } else {
      json += '{ "value": "0", "id": 0}';
    }
    json += '],';
    json += '"quantity": ' + quantity + ','
    //dodavame rental date bidejki apito vraka greska ako nema rental date iako ne e potrebno
    //rental_start_date mora da e pogolemo od momentalnoto a rental_end_date mora da e podolemo od rental_start_date
    var date = new Date(); 
    //var rental_start_date =  new Date('2070-01-01T00:00:00');
    var monnth = ''; 
    if (date.getUTCMonth() < 10) {
      monnth = '0' + date.getUTCMonth();
    } else {
      monnth = date.getUTCMonth().toString();
    }
    var day = ''; 
    if (date.getUTCDate() < 10) {
      day = '0' + date.getUTCDate();
    } else {
      day = date.getUTCDate().toString();
    }
    var hour = ''; 
    if (date.getUTCHours() < 10) {
      hour = '0' + date.getUTCHours();
    } else {
      hour = date.getUTCHours().toString();
    }
    var minutes = ''; 
    if (date.getUTCMinutes() < 10) {
      minutes = '0' + date.getUTCMinutes();
    } else {
      minutes = date.getUTCMinutes().toString();
    }
    var seconds = ''; 
    if (date.getUTCSeconds() < 10) {
      seconds = '0' + date.getUTCSeconds();
    } else {
      seconds = date.getUTCSeconds().toString();
    }
    var created_on_utc = date.getUTCFullYear() + '-' + monnth + '-' + day
    + 'T' + hour + ':' + minutes + ':' + seconds;
    console.log('rental_start_daterental_start_daterental_start_daterental_start_daterental_start_daterental_start_daterental_start_daterental_start_daterental_start_date');
    console.log(created_on_utc);
    //"created_on_utc": "2022-03-15T02:32:47.660Z",
    json += '"created_on_utc": "' + created_on_utc + '",';
    json += '"rental_start_date_utc": "' + '2030-03-15T03:32:47' + '",';
    
    //var rental_end_date =  new Date('2071-01-01T00:00:00');
    /* monnth = ''; 
    if (date.getUTCMonth() < 10) {
      monnth = '0' + (date.getUTCMonth() + 1);
    } else {
      monnth = (date.getUTCMonth() + 1).toString();
    }

    var rental_end_date = date.getUTCFullYear() + '-' + monnth + '-' + day
    + 'T' + hour + ':' + minutes + ':' + seconds + '.660Z'; */
    json += '"rental_end_date_utc": "' + '2031-03-15T03:32:47' + '",';
    /* console.log('rental_end_daterental_end_daterental_end_daterental_end_daterental_end_daterental_end_daterental_end_daterental_end_daterental_end_date');
    console.log(rental_end_date); */

    //ShoppingCart za cart, Wishlist za wishlist
    json += '"shopping_cart_type": "' + cartOrWishList + '",'
    json += '"product_id": ' + product_id + ',';

    let currentUser!: Token;
    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    
    json += '"customer_id": ' + currentUser.customer_id;

    json += '} }';

    console.log('jsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjsonjson');
    console.log(json);

    var error = json.substring(44, 54);
    console.log('errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror');
    console.log(error);

    json = JSON.parse(json);
    
    return this.http.post<any>(this.apiUrl + 'shopping_cart_items', json);
  }

  getShoppingCartItems() {
    return this.httpGet.get<any>(this.apiUrl + 'shopping_cart_items/me');
  }

  getWishlistShoppingCartItems(shoppingCartType: string) {
    /* let currentUser!: Token;
    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user); */
    let currentUser!: Token;
    if (typeof window == 'undefined') {
      currentUser = JSON.parse(this.cookieManager.getItem(this.document.cookie, 'user') || '{ }');
    } else if (typeof window !== 'undefined') {
      currentUser = JSON.parse(localStorage.getItem('user') || '');
    }
    var CustomerId = currentUser.customer_id;

    return this.httpGet.get<any>(this.apiUrl + 'shopping_cart_items' + '?ShoppingCartType=' + shoppingCartType + '&CustomerId=' + CustomerId);
  }

  deleteWishlistCartItem(wishlistShoppingCartItemId: string) {
    return this.http.delete<any>(this.apiUrl + 'shopping_cart_items' + '/' + wishlistShoppingCartItemId);
  }

  updateShoppingCartQuantity(quantity: string, cartItemId: string) {
    var json = '';
    json += '{ "ObjectPropertyNameValuePairs": {}, "shopping_cart_item": { "quantity": ' + quantity + ' } }'

    return this.http.put<any>(this.apiUrl + 'shopping_cart_items' + '/' + cartItemId, json );
  }

  deleteShoppingCart() {
    /* let currentUser!: Token;
    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user); */
    let currentUser!: Token;
    if (typeof window == 'undefined') {
      currentUser = JSON.parse(this.cookieManager.getItem(this.document.cookie, 'user') || '{ }');
    } else if (typeof window !== 'undefined') {
      currentUser = JSON.parse(localStorage.getItem('user') || '');
    }
    var CustomerId = currentUser.customer_id;

    return this.http.delete<any>(this.apiUrl + 'shopping_cart_items' + '?ShoppingCartType=ShoppingCart&CustomerId=' + CustomerId);
  }
}
