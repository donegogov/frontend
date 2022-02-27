import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { MainContentComponent } from './main-content/main-content.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { WhyUsComponent } from './why-us/why-us.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeSliderComponent,
    MainContentComponent,
    TopSellingProductsComponent,
    WhyUsComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  exports: [
    HomeSliderComponent,
    MainContentComponent,
    HomeComponent
  ]
})
export class HomeModule { }
