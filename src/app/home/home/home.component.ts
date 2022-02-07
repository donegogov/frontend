import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchAsRootObject } from 'src/app/shared/_models/products-search-as-root-object';
import { ProductsService } from 'src/app/shared/_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  ngOnInit(): void {
  }
}
