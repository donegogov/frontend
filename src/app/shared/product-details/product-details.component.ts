import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', './product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';
  product: any;
  reload = 'true';

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router) {
      if (!localStorage.getItem('reload')) {
        localStorage.setItem('reload', 'true');
      } else {
        this.reload = localStorage.getItem('reload') || 'false';
      }
     }

  ngOnInit(): void {
    if (this.reload == 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'false');
    }
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

  ngOnDestroy() {
    localStorage.setItem('reload', 'true');
  }

}
