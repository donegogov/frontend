import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductsForHomePageSlider } from '../_models/products-for-home-page-slider';
import { ProductAsRootObject } from '../_models/products-as-root-object';
import { ProductsForHomePageSearch } from '../_models/products-for-home-page-search';
import { Observable, Subject } from 'rxjs';
import { ProductSearchAsRootObject } from '../_models/products-search-as-root-object';
import { ProductsTopSelling } from '../_models/products-top-selling';
import { ProductTopSellingAsRootObject } from '../_models/products-top-selling-as-root-object';
import { ProductsPricingAsRootObject } from '../_models/products-pricing-as-root-object';
import { ProductsPricing } from '../_models/products-pricing';
import { ListProductAsRootObject } from '../_models/list-products-as-root-object';
import { CustomHttpClientService } from './custom-http-client.service';


@Injectable()
export class ProductsService {
    apiUrl = environment.apiUrl;
    sliderProducts!: ProductsForHomePageSlider[];
    searchProducts!: ProductsForHomePageSearch[];
    topSellingProducts!: ProductsTopSelling[];
    productsPricing!: ProductsPricing[];
    searchProductChange: Subject<ProductsForHomePageSearch[]> = new Subject<ProductsForHomePageSearch[]>();

constructor(private http: HttpClient,
    private httpGet: CustomHttpClientService
    ) {
    this.searchProductChange.subscribe((value) => {
        this.searchProducts = value;
    });
 }

getHomePageSliderProducts(limit: number, page: number) {
    return this.httpGet.get<ProductAsRootObject>(this.apiUrl + 'home-page-slider-products' + '?limit=' + limit.toString() + '&page=' + page.toString());
}

getSearchProducts(limit: number, page: number, searchTearm: string, search_name: boolean, search_short_description: boolean, search_full_description: boolean) : Observable<ProductSearchAsRootObject> {
    return this.http.get<ProductSearchAsRootObject>(this.apiUrl + 'search-products' + '?limit=' + limit.toString() + '&page=' + page.toString()
    + '&SearchTearm=' + searchTearm + '&SearchName=' + search_name.toString() + '&SearchShortDescription=' + search_short_description.toString()
    + '&SearchFullDescription=' + search_full_description.toString());
}

getTopSellingProducts(limit: number, page: number, productsToReturn: number) {
    return this.httpGet.get<ProductTopSellingAsRootObject>(this.apiUrl + 'top-selling-products' + '?Limit=' + limit.toString() + '&Page=' + page.toString() + '&ProductToReturn=' + productsToReturn.toString());
}

getPrices(limit: number = 250, page: number = 1) {
    return this.httpGet.get<ProductsPricingAsRootObject>(this.apiUrl + 'price-products' + '?Limit=' + limit.toString() + '&Page=' + page.toString());
}

getForShopPageSearchProducts(limit: number, page: number, searchTearm: string, search_name: boolean, search_short_description: boolean,
     search_full_description: boolean, price_from: number = 0, price_to: number = 0,
     category_ids: number[]) : Observable<ListProductAsRootObject> {

        var categoryIds = '';
        category_ids.forEach((element, i) => {
            categoryIds += 'CategoryIds=' + element.toString() + '&';
        });

    return this.http.get<ListProductAsRootObject>(this.apiUrl + 'search-tearm-price-category-products' + '?limit=' + limit.toString() + '&page=' + page.toString()
    + '&SearchTearm=' + searchTearm + '&SearchName=' + search_name.toString() + '&SearchShortDescription=' + search_short_description.toString()
    + '&SearchFullDescription=' + search_full_description.toString() + '&' + categoryIds + 'PriceTo=' + price_to + '&PriceFrom=' + price_from);
}

getProductById(id: string) {
    return this.httpGet.get<any>(this.apiUrl + 'products/' + id);
}

changesearchProduct(products: ProductsForHomePageSearch[]) {
    this.searchProductChange.next(products);
}

}
