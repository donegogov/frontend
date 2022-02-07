import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { ProductsForHomePageSlider } from '../../_models/products-for-home-page-slider';
import { ProductsForHomePageSearch } from '../../_models/products-for-home-page-search';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchAsRootObject } from '../../_models/products-search-as-root-object';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchProductComponent implements OnInit {
  allSearchProducts: ProductsForHomePageSearch[] = 
    [
    {
        id: 0,
        name: "demo",
        short_description: "demo",
        full_description: "demo",
        show_on_home_page: true,
        price: 0,
        images: [{
          attachment: "",
          id: 0,
          pictureId: 0,
          position: 0,
          src: ""
        }]
    }
  ];
  searchProduct: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  productCtrl = new FormControl();
  filteredProducts!: Observable<ProductsForHomePageSearch[]>;

  @ViewChild('productInput') productInput!: ElementRef;

  constructor(private productsService: ProductsService,
    private route: ActivatedRoute) {
      console.log('search component');
      console.log('this.productsService.searchProducts');
      console.log(this.productsService.searchProducts);
      if (this.productsService.searchProducts == undefined || this.productsService.searchProducts == null || this.productsService.searchProducts.length == 0) {
        this.productsService.getSearchProducts(250, 1).subscribe(data => {
          if (data) {
            console.log(data);
            this.allSearchProducts = data.products;
            this.productsService.searchProducts = data.products;

            this.filteredProducts = this.productCtrl.valueChanges.pipe(
              startWith(null),
              map((productName: string | null) => (productName? this._filteredProducts(productName) : this.allSearchProducts.slice())),
            );
          }
        });
      } else {
        this.allSearchProducts = this.productsService.searchProducts;
        console.log(this.productsService.searchProducts);
        console.log('this.productsService.searchProducts');
      }
  }

  private _filteredProducts(productName: string): ProductsForHomePageSearch[] {
    const filterValue = productName.toLowerCase();

    return this.allSearchProducts.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    /* this.route.data.subscribe(data => {
      console.log('data');
      console.log(data);
      this.allSearchProducts = data['searchProduct'].products;
    }); */
    /* if (this.productsService.searchProducts == undefined || this.productsService.searchProducts == null || this.productsService.searchProducts.length == 0) {
      this.productsService.getSearchProducts(250, 1).subscribe(data => {
        if (data) {
          console.log(data);
          this.allSearchProducts = data.products;
          this.productsService.searchProducts = data.products;
        }
      });
    } else {
      this.allSearchProducts = this.productsService.searchProducts;
      console.log(this.productsService.searchProducts);
      console.log('this.productsService.searchProducts');
    } */
  }

  add(event: MatChipInputEvent): void {
    console.log('event');
    console.log(event);
    const input = event.input;
    const productName = event.value;

    // Add our fruit
    if ((productName || '').trim()) {
      this.searchProduct.push(productName);
      /* this.searchProduct.forEach((element, i) => {
        if (productName == element.name) {
          this.searchProduct.push(element);
        }
      }); */
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.productCtrl.setValue(null);
  }

  remove(productName: string): void {
    if ((productName || '').trim()) {
      var index = this.searchProduct.indexOf(productName);
      this.searchProduct.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var productName = event.option.value;
    
    if ((productName || '').trim()) {
      this.searchProduct.push(productName);
    }
    this.productInput.nativeElement.value = '';
    this.productCtrl.setValue(null);
  }


}