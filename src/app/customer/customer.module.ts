import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AccountComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
