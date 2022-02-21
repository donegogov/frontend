import { Component, Input, OnInit } from '@angular/core';
import { ProductSearchAsRootObject } from '../../shared/_models/products-search-as-root-object';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css', './shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
