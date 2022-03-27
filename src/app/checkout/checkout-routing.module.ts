import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutUsernamePasswordComponent } from './checkout-username-password/checkout-username-password.component';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'cart',
    component: ShoopingCartComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'checkout/signin',
    component: CheckoutUsernamePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
