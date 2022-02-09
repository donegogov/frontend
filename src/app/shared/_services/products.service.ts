import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductsForHomePageSlider } from '../_models/products-for-home-page-slider';
import { ProductAsRootObject } from '../_models/products-as-root-object';
import { ProductsForHomePageSearch } from '../_models/products-for-home-page-search';
import { Observable, Subject } from 'rxjs';
import { ProductSearchAsRootObject } from '../_models/products-search-as-root-object';


@Injectable()
export class ProductsService {
    apiUrl = environment.apiUrl;
    sliderProducts!: ProductsForHomePageSlider[];
    searchProducts!: ProductsForHomePageSearch[];
    searchProductChange: Subject<ProductsForHomePageSearch[]> = new Subject<ProductsForHomePageSearch[]>();

constructor(private http: HttpClient) {
    this.searchProductChange.subscribe((value) => {
        this.searchProducts = value;
    });
 }

getHomePageSliderProducts(limit: number, page: number) {
    return this.http.get<ProductAsRootObject>(this.apiUrl + 'home-page-slider-products' + '?limit=' + limit.toString() + '&page=' + page.toString());
}

getSearchProducts(limit: number, page: number, searchTearm: string, search_name: boolean, search_short_description: boolean, search_full_description: boolean) : Observable<ProductSearchAsRootObject> {
    return this.http.get<ProductSearchAsRootObject>(this.apiUrl + 'search-products' + '?limit=' + limit.toString() + '&page=' + page.toString()
    + '&SearchTearm=' + searchTearm + '&SearchName=' + search_name.toString() + '&SearchShortDescription=' + search_short_description.toString()
    + '&SearchFullDescription=' + search_short_description.toString());
}

changesearchProduct(products: ProductsForHomePageSearch[]) {
    this.searchProductChange.next(products);
}

}
