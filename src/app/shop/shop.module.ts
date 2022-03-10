import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { SearchCategoriesComponent } from './components/search-categories/search-categories.component';
import { PriceFromToComponent } from './components/price-from-to/price-from-to.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ShopTitleComponent } from './components/shop-title/shop-title.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { SharedModule } from '../shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';


@NgModule({
  declarations: [
    ShopProductsComponent,
    ShopTitleComponent,
    SearchProductComponent,
    SearchCategoriesComponent,
    PriceFromToComponent,
    ListProductsComponent,
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
  ]
})
export class ShopModule { }
