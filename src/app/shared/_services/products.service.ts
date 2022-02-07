import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductsForHomePageSlider } from '../_models/products-for-home-page-slider';
import { ProductAsRootObject } from '../_models/products-as-root-object';


@Injectable()
export class ProductsService {
    apiUrl = environment.apiUrl;
    sliderProducts!: ProductsForHomePageSlider[];
    searchProducts!: ProductsForHomePageSlider[];

constructor(private http: HttpClient) { }

getHomePageSliderProducts(limit: number, page: number) {
    return this.http.get<ProductAsRootObject>(this.apiUrl + 'home-page-slider-products' + '?limit=' + limit.toString() + '&page=' + page.toString());
}

getSearchProducts(limit: number, page: number) {
    return this.http.get<ProductAsRootObject>(this.apiUrl + 'home-page-slider-products' + '?limit=' + limit.toString() + '&page=' + page.toString());
}

}
