import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsPricing } from 'src/app/shared/_models/products-pricing';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css', './shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {
  From = 'From';
  To = 'To';
  productPricing!: ProductsPricing[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log('data[productPricing]');
      console.log(data['productPricing']);
      this.productPricing = data['productPricing'].products;
    });
  }

}
