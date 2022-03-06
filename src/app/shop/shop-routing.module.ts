import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceFromToResolver } from '../shared/_resolvers/price-from-to.resolver';
import { ShopProductsComponent } from './shop-products/shop-products.component';

const routes: Routes = [
  {
    path: '',
    component: ShopProductsComponent,
    resolve: { productPricing: PriceFromToResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
