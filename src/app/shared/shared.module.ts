import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSliderModule} from '@angular/material/slider'; 

import { SharedRoutingModule } from './shared-routing.module';
import { MagicMainMenuComponent } from './components/magic-main-menu/magic-main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageSliderResolver } from './_resolvers/home-page-slider.resolver';
import { ProductsService } from './_services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchProductResolver } from './_resolvers/search-product.resolver';
import { AnimatedShopComponent } from './animated-shop/animated-shop.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { PriceFromToResolver } from './_resolvers/price-from-to.resolver';


@NgModule({
  declarations: [
    MagicMainMenuComponent,
    HeaderComponent,
    FooterComponent,
    AnimatedShopComponent,
    MobileAppsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  providers: [
    HomePageSliderResolver,
    ProductsService,
    HttpClient,
    SearchProductResolver,
    PriceFromToResolver
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
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    CarouselModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AnimatedShopComponent,
    MobileAppsComponent,
  ]
})
export class SharedModule { }
