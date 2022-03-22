import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatRadioModule} from '@angular/material/radio'; 
import { SwiperModule } from "swiper/angular";
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'


import { SharedRoutingModule } from './shared-routing.module';
import { MagicMainMenuComponent } from './components/magic-main-menu/magic-main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageSliderResolver } from './_resolvers/home-page-slider.resolver';
import { ProductsService } from './_services/products.service';
import { SearchProductResolver } from './_resolvers/search-product.resolver';
import { AnimatedShopComponent } from './animated-shop/animated-shop.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { PriceFromToResolver } from './_resolvers/price-from-to.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingCartContinueShoppingComponent } from './_dialog/shopping-cart-continue-shopping/shopping-cart-continue-shopping.component';
import { CookieManagerService } from './_services/cookie-manager.service';
import { CustomHttpClientService } from './_services/custom-http-client.service';


@NgModule({
  declarations: [
    MagicMainMenuComponent,
    HeaderComponent,
    FooterComponent,
    AnimatedShopComponent,
    MobileAppsComponent,
    NotFoundComponent,
    ShoppingCartContinueShoppingComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    HomePageSliderResolver,
    ProductsService,
    SearchProductResolver,
    PriceFromToResolver,
    CookieManagerService,
    CustomHttpClientService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MagicMainMenuComponent,
    CarouselModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    CarouselModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AnimatedShopComponent,
    MobileAppsComponent,
    NotFoundComponent,
    SwiperModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class SharedModule { }
