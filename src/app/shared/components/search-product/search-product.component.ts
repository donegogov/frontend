import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
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
        name: "",
        short_description: "",
        full_description: "",
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
      this.filteredProducts = this.productCtrl.valueChanges
        .pipe(
          startWith(''),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(productName => {
            return this._filteredProducts(productName || '')
          })
        );       
  }

  private _filteredProducts(productName: string) {
    const filterValue = productName.toLowerCase();
    // call the service which makes the http-request
    return this.productsService.getSearchProducts(7, 1, filterValue, true, true, true)
     .pipe(
       map((response: ProductSearchAsRootObject) => {
         return response.products;
       }));
  }

  ngOnInit(): void {
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