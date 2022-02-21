import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../shared/_services/products.service';
import { ProductsForHomePageSlider } from '../../../shared/_models/products-for-home-page-slider';
import { ProductsForHomePageSearch } from '../../../shared/_models/products-for-home-page-search';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchAsRootObject } from '../../../shared/_models/products-search-as-root-object';
import { CategoryService } from '../../../shared/_services/category.service';
import { CategoryAsRootObject } from '../../../shared/_models/category-as-root-object';
import { CategoryForHomePageSearch } from '../../../shared/_models/catefory-for-home-page-search';

@Component({
  selector: 'app-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchCategoriesComponent implements OnInit {
  allSearchCategories: CategoryForHomePageSearch[] = 
  [
  {
      id: 0,
      name: "",
      description: "",
      show_on_home_page: true,
      image: {
        attachment: "",
        src: ""
      },
      parent_category_id: 0,
      include_in_top_menu: false,
      published: false,
      display_order: 0
  }
];
searchCategory = this.allSearchCategories;

categoryControl = new FormControl([]);
  chipListControl = new FormControl([]);
  matChipValue = '';
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  toppingListComplete: string[] = this.toppingList;
  inputText: string = '';
  @ViewChild("chipList", { static: true })
  input!: ElementRef;





@ViewChild('categoryInput') categoryInput!: ElementRef;

constructor(private categorySearvice: CategoryService,
  private route: ActivatedRoute) {  
}






onCategoryRemoved(category: string) {
  const categories = this.categoryControl.value as string[];
  this.removeFirst(categories, category);
  this.categoryControl.setValue(categories); // To trigger change detection
}

private removeFirst<T>(array: T[], toRemove: T): void {
  const index = array.indexOf(toRemove);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

showHideOption(value: string) {
  //console.log(this.input);
  //console.log(this.inputText);
  if (this.inputText == '' || this.inputText == null) {
    this.searchCategory = this.allSearchCategories;
  }
  else if (value.toLowerCase().includes(this.inputText.toLowerCase())) {
    return true;
  } else {
    return false;
  }

  return true;
}

ngOnInit(): void {
}

matSelectFocusGetCategories() {
  if (this.allSearchCategories === undefined || this.allSearchCategories === null 
    || this.allSearchCategories.length === 0 || this.allSearchCategories.length === 1) {
    this.categorySearvice.getAllCategories(250, 1).subscribe(data => {
    if (data) {
        this.allSearchCategories = data.categories;
        this.categorySearvice.categories = data.categories;
        console.log(data.categories);
      }
    });
  }
}


}