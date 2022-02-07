import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductSearchAsRootObject } from '../_models/products-search-as-root-object';
import { ProductsService } from '../_services/products.service';

@Injectable({
  providedIn: 'root'
})
export class SearchProductResolver implements Resolve<ProductSearchAsRootObject> {

  constructor(private productService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductSearchAsRootObject> {
    return this.productService.getSearchProducts(250, 1);
  }
}
