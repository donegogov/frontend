import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'

import { MagicMainMenuComponent } from './components/magic-main-menu/magic-main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageSliderResolver } from './_resolvers/home-page-slider.resolver';
import { ProductsService } from './_services/products.service';
import { SearchProductResolver } from './_resolvers/search-product.resolver';
import { AnimatedShopComponent } from './animated-shop/animated-shop.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { ShoppingCartContinueShoppingComponent } from './_dialog/shopping-cart-continue-shopping/shopping-cart-continue-shopping.component';
import { CookieManagerService } from './_services/cookie-manager.service';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MagicMainMenuComponent,
    HeaderComponent,
    FooterComponent,
    AnimatedShopComponent,
    MobileAppsComponent,
    ShoppingCartContinueShoppingComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [
    HomePageSliderResolver,
    ProductsService,
    SearchProductResolver,
    CookieManagerService,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MagicMainMenuComponent,
    CarouselModule,
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    CarouselModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AnimatedShopComponent,
    MobileAppsComponent,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SwiperModule
  ]
})
export class SharedModule { }
