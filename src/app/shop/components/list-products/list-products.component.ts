import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { ProductsTopSelling } from 'src/app/shared/_models/products-top-selling';
import { ProductsService } from 'src/app/shared/_services/products.service';
declare function addToCart(): any;

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css', './list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  topSellingProducts: ProductsTopSelling[] = 
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
      }],
      product_total_order_items_count: 0
  }
];
numbers!: Array<number>;

scrHeight:any;
scrWidth:any;
mobile = false;
productToReturn = 5;
showZoom = false;
isLoadedScript = true;
hover = false;
@Input('mainImg') mainImg!: HTMLImageElement;
@Input('resultImg') resultImg!: HTMLImageElement;

@HostListener('window:resize', ['$event'])
getScreenSize() {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      console.log(this.scrHeight, this.scrWidth);
}
innerWidth = 0;
innerHeight = 0;
categoryIdsGetData = false;
priceFromToGetData = false;
searchTearmGetData = false;
initGetData = false;
wishList: wishList[] = [];
private _priceFromTo!: number[];
    
    @Input() set priceFromTo(value: number[]) {
    
       this._priceFromTo = value;
       this.priceFromToChanged(this._priceFromTo);
    
    }
    
    get priceFromTo(): number[] {
    
        return this._priceFromTo;
    
    }
private _searchTearms!: string[];
    
    @Input() set searchTearms(value: string[]) {
    
       this._searchTearms = value;
       this.searchTearmChanged(this._searchTearms);
    
    }
    
    get searchTearms(): string[] {
    
        return this._searchTearms;
    
    }


private _categoryId!: number[];
    
    @Input() set categoryIds(value: number[]) {
    
       this._categoryId = value;
       this.categoryChanged(this._categoryId);
    
    }
    
    get categoryIds(): number[] {
    
        return this._categoryId;
    
    }

constructor(private productsService: ProductsService, private _renderer2: Renderer2, 
  @Inject(DOCUMENT) private _document: Document) { 
  this.numbers = Array(60).fill(4);
  this.getScreenSize();

  if (this.scrWidth <= 993) {
    this.mobile = true;
  }
  if (this.mobile) {
    this.productToReturn = 3;
  }
}

ngOnInit(): void {
  this.initGetData = true;
  this.getData();
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
}

getData() {
  if ((this.categoryIdsGetData && this.priceFromToGetData && this.searchTearmGetData) || this.initGetData) {
    this.productsService.getForShopPageSearchProducts(250, 1, this._searchTearms.join(' '), true, true, true,
    this.priceFromTo[0], this.priceFromTo[1], this._categoryId).subscribe(data => {
      console.log(data);
      if (data) {
        console.log('this.topSellingProducts');
        console.log(data.products);
        this.topSellingProducts = data.products;
        //setTimeout(addToCart(), 1000);
        setTimeout(function(){
          console.log('Timeout add to cart');
          addToCart();
        }, 100);
        //addToCart();
        //this.productsService.topSellingProducts = data.products;
      }
    });
  }
  if (this._categoryId == undefined && this._priceFromTo == undefined && this._searchTearms == undefined) {
    this._categoryId = [];
    this._priceFromTo = [];
    this._searchTearms = [];
    return;
  }

  if (this._categoryId == undefined) {
    this._categoryId = [];
    this.categoryIdsGetData = true;
  }
  if (this._priceFromTo == undefined) {
    this._priceFromTo = [];
    this.priceFromToGetData = true;
  }
  if (this._searchTearms == undefined) {
    this._searchTearms = [];
    this.searchTearmGetData = true;
  }
}

ngAfterViewInit(): void {
}

addToWishList(id: number) {
  if (this.wishList.filter(w => w.ids == id).length > 0) {
    //var index = this.wishList.ids.indexOf(id);
    this.wishList.filter(w => w.ids == id)[0].wishList = !this.wishList.filter(w => w.ids == id)[0].wishList;
  }
  else {
    this.wishList.push({ids: id, wishList: true});
  }
}

wishListYn(id: number) {
  /* console.log('this.wishList.filter(w => w.ids == id)');
  console.log(this.wishList.filter(w => w.ids == id)); */
  if (this.wishList.filter(w => w.ids == id).length > 0) {
    return this.wishList.filter(w => w.ids == id)[0].wishList;
  }
  else {
    return false;
  }
}

categoryChanged(categoryIds: number[]) {
  this.getData();
  console.log('Category changed ' + categoryIds);
}

priceFromToChanged(priceFromTo: number[]) {
  this.getData();
  console.log('Price changed ' + priceFromTo);
}

searchTearmChanged(searchTearm: string[]) {
  this.getData();
  console.log('Search tearm changed ' + searchTearm);
}

loadScript(event: any) {
console.log('event');
console.log(event.target.children[0].children);
//script.text = 'imageZoom(' + product.id + ', result' + product.id + ');';
  if (this.isLoadedScript) {
  this.topSellingProducts.forEach(element => {
    /* var script = document.createElement("script");
    script.type = "text/javascript";
    console.log('id');
    console.log(element.id);
    script.text = 'zoomIn(' + event.target.children[0].children[0] + ',' + event.target.children[0].children[1] + ');';
    console.log(script); */
    var script = '<script> zoomIn(' + element.id + '); </script>';
    document.body.append(script);
  });
}
this.isLoadedScript = false;
}

}


export interface wishList {
    ids: number,
    wishList: boolean
};