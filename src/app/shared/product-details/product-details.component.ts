import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', './product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';
  product: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') || ''; 
      console.log('ID = ' + this.id);
    });
    this.productService.getProductById(this.id).subscribe(data => {
      console.log('getProductById');
      this.product = data.products[0];
      console.log(this.product);
    });
  }

}
