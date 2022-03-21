import { OrderService } from 'src/app/shared/_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  constructor(private orderService: OrderService,
    private titleService: Title,
    private metaTagService: Meta) { }

  ngOnInit(): void {
    this.orderService.getOrdersForCustomer().subscribe(dataOrder => {
      if (dataOrder) {
        this.orders = dataOrder.orders;
        console.log(this.orders[0].order_items[0].product.short_description);
      }
    });

    this.titleService.setTitle('Нарачки');
    this.metaTagService.addTag(
      { name: 'description', content: 'Погледнете Ја Историјата На Нарачките' }
    );
    this.metaTagService.addTag(
      { name: 'og:title', content: 'Нарачки' },
        );
        this.metaTagService.addTag(
      { name: 'og:description', content: 'Погледнете Ја Историјата На Нарачките' },
        );
        /* this.metaTagService.addTag(
      { name: 'og:image', content: this.product.images[0].src },
        ); */
  }

}
