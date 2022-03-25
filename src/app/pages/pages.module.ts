import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ThankYouComponent,
    NotFoundComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
