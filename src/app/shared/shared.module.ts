import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon'

import { SharedRoutingModule } from './shared-routing.module';
import { MagicMainMenuComponent } from './components/magic-main-menu/magic-main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopTitleComponent } from './components/shop-title/shop-title.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { HomePageSliderResolver } from './_resolvers/home-page-slider.resolver';
import { ProductsService } from './_services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchProductResolver } from './_resolvers/search-product.resolver';



@NgModule({
  declarations: [
    MagicMainMenuComponent,
    HeaderComponent,
    FooterComponent,
    ShopProductsComponent,
    ShopTitleComponent,
    SearchProductComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CarouselModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    HomePageSliderResolver,
    ProductsService,
    HttpClient,
    SearchProductResolver
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
