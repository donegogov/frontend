import { NgModule } from '@angular/core';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutUsernamePasswordComponent } from './checkout-username-password/checkout-username-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModule } from '../shared/shared.module';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    CheckoutUsernamePasswordComponent,
    WishlistComponent,
    ShoopingCartComponent
  ],
  imports: [
    CheckoutRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxGNXSTPo5mP2zO7ZjuVFzfIFema-x0yc',
      libraries: ['places']
    }),
  ]
})
export class CheckoutModule { }
