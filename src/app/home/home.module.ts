import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { MainContentComponent } from './main-content/main-content.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeSliderComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
