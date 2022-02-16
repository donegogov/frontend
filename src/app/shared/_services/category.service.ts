import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductsForHomePageSlider } from '../_models/products-for-home-page-slider';
import { ProductAsRootObject } from '../_models/products-as-root-object';
import { ProductsForHomePageSearch } from '../_models/products-for-home-page-search';
import { Observable, Subject } from 'rxjs';
import { ProductSearchAsRootObject } from '../_models/products-search-as-root-object';
import { CategoryAsRootObject } from '../_models/category-as-root-object';
import { CategoryForHomePageSearch } from '../_models/catefory-for-home-page-search';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl;
  categories!: CategoryForHomePageSearch[];

constructor(private http: HttpClient) { }

getAllCategories(limit: number, page: number) {
  return this.http.get<CategoryAsRootObject>(this.apiUrl + 'allcategories' + '?limit=' + limit.toString() + '&page=' + page.toString());
}

}
