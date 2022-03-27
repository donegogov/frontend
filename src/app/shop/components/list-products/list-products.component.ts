import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ListProducts } from 'src/app/shared/_models/list-products';
import { productAttributeIdAttributeValuesId } from 'src/app/shared/_models/product-attribute-id-attribute-values-id';
import { ProductsTopSelling } from 'src/app/shared/_models/products-top-selling';
import { CartService } from 'src/app/shared/_services/cart.service';
import { ProductsService } from 'src/app/shared/_services/products.service';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from 'src/app/shared/_services/token.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css', './list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  topSellingProducts: ListProducts[] = 
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
  if (typeof window !== 'undefined') {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      console.log(this.scrHeight, this.scrWidth);
  }
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

    private isBrowser!: boolean;

constructor(private productsService: ProductsService, private _renderer2: Renderer2,
  private cartService: CartService,
  private router: Router,
  private tokenService: TokenService,
  @Inject(PLATFORM_ID) platformId: Object) { 
  this.numbers = Array(60).fill(4);
  //this.getScreenSize();

  if (this.scrWidth <= 993) {
    this.mobile = true;
  }
  if (this.mobile) {
    this.productToReturn = 3;
  }
  this.isBrowser = isPlatformBrowser(platformId);
}

ngOnInit(): void {
  this.initGetData = true;
  this.getData();
  if(this.isBrowser) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    localStorage.setItem('reload', 'true')
  }
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
        if(this.isBrowser && this.tokenService.isLogedIn()) {
        this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe(dataWl => {
          console.log('dataWldataWldataWldataWldataWldataWldataWldataWldataWldataWldataWldataWl');
        console.log(dataWl);
          dataWl.shopping_carts.forEach((element: any, i: number) => {
            this.wishList.push({ids: element.product.id, wishList: true});
          });
        });
      }
        console.log('this.wishListthis.wishListthis.wishListthis.wishListthis.wishListthis.wishListthis.wishListthis.wishList');
        console.log(this.wishList);
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

addToWishList(product: any) {
  if(this.isBrowser && this.tokenService.isLogedIn()) {
  var addWishlist = false;
  if (this.wishList.filter(w => w.ids == product.id).length > 0) {
    this.wishList.filter(w => w.ids == product.id)[0].wishList = !this.wishList.filter(w => w.ids == product.id)[0].wishList;
    addWishlist = this.wishList.filter(w => w.ids == product.id)[0].wishList;
  }
  else {
    this.wishList.push({ids: product.id, wishList: true});
    addWishlist = true;
  }
  console.log(this.wishList);
  if (addWishlist) {
    //addWishlist = true;
    var tempDictAttributeIdAttributeValueId: productAttributeIdAttributeValuesId[] = [];
    for(var i = 0; i < product.attributes.length; i++) {
      var attributeIdValueId: productAttributeIdAttributeValuesId = {key: product.attributes[i].id, value: product.attributes[i].attribute_values[0].id};
      tempDictAttributeIdAttributeValueId.push(attributeIdValueId);
    }
    this.cartService.addToWishListOrCart(tempDictAttributeIdAttributeValueId,
      '1', 'Wishlist', product.id.toString()).subscribe(data => {
        console.log('datadatadatadatadatadatadatadatadatadatadatadatadata');
        console.log(data);
        //this.showErrorMessage = false;
      });
    return true;
  }
  else {
    //this.wishList = false;
    this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe((data: any) => {
      if (data) {
        data.shopping_carts.forEach((element: any, i: number) => {
          if (element.product.id == product.id) {
            this.cartService.deleteWishlistCartItem(element.id).subscribe(data => {
              console.log(data);
            });
          }
        });
      }
    });
    return false;
  }
  }
  return false;
  
}

wishListYn(id: number) {
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
  if(this.isBrowser) {
console.log('event');
console.log(event.target.children[0].children);
  if (this.isLoadedScript) {
  this.topSellingProducts.forEach(element => {
    var script = '<script> zoomIn(' + element.id + '); </script>';
    document.body.append(script);
  });
}
this.isLoadedScript = false;
  }
}

productDetails(id: number) {
  this.router.navigate(['/pages/details/', id])
  .then(() => {
    //window.location.reload();
  });
}

}

export interface wishList {
    ids: number,
    wishList: boolean
};