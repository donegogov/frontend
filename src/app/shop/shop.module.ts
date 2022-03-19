import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';


import { ShopRoutingModule } from './shop-routing.module';
import { SearchCategoriesComponent } from './components/search-categories/search-categories.component';
import { PriceFromToComponent } from './components/price-from-to/price-from-to.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ShopTitleComponent } from './components/shop-title/shop-title.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { SharedModule } from '../shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutUsernamePasswordComponent } from './checkout-username-password/checkout-username-password.component';


@NgModule({
  declarations: [
    ShopProductsComponent,
    ShopTitleComponent,
    SearchProductComponent,
    SearchCategoriesComponent,
    PriceFromToComponent,
    ListProductsComponent,
    ProductDetailsComponent,
    ShoopingCartComponent,
    WishlistComponent,
    CheckoutUsernamePasswordComponent,
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxGNXSTPo5mP2zO7ZjuVFzfIFema-x0yc',
      libraries: ['places']
    }),
  ]
})
export class ShopModule { }
