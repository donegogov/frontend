import { OrderService } from 'src/app/shared/_services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersForCustomer().subscribe(dataOrder => {
      if (dataOrder) {
        this.orders = dataOrder.orders;
        console.log(this.orders[0].order_items[0].product.short_description);
      }
    });
  }

}
