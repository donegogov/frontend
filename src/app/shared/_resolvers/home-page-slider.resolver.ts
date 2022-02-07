import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProductAsRootObject } from '../_models/products-as-root-object';
import { ProductsForHomePageSlider } from '../_models/products-for-home-page-slider';
import { ProductsService } from '../_services/products.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageSliderResolver implements Resolve<ProductAsRootObject> {

  constructor(private productService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductAsRootObject> {
    return this.productService.getHomePageSliderProducts(8, 1);
  }
}
