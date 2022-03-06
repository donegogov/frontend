import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsPricingAsRootObject } from '../_models/products-pricing-as-root-object';
import { ProductsService } from '../_services/products.service';

@Injectable({
  providedIn: 'root'
})
export class PriceFromToResolver implements Resolve<ProductsPricingAsRootObject> {
  constructor(private productService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductsPricingAsRootObject> {
      return this.productService.getPrices();
  }
}
