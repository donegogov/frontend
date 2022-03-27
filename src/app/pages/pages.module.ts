import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ThankYouComponent,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
