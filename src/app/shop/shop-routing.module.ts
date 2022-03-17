import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceFromToResolver } from '../shared/_resolvers/price-from-to.resolver';
import { CheckoutUsernamePasswordComponent } from './checkout-username-password/checkout-username-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: ShopProductsComponent,
    resolve: { productPricing: PriceFromToResolver}
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: ShoopingCartComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'signin',
    component: CheckoutUsernamePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
