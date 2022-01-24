import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MagicMainMenuComponent } from './components/magic-main-menu/magic-main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopTitleComponent } from './components/shop-title/shop-title.component';


@NgModule({
  declarations: [
    MagicMainMenuComponent,
    HeaderComponent,
    FooterComponent,
    ShopProductsComponent,
    ShopTitleComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CarouselModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MagicMainMenuComponent,
    CarouselModule,
    ShopProductsComponent,
    ShopTitleComponent
  ]
})
export class SharedModule { }
