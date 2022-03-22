import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { productAttributeIdAttributeValuesId } from 'src/app/shared/_models/product-attribute-id-attribute-values-id';
import { ProductsTopSelling } from 'src/app/shared/_models/products-top-selling';
import { CartService } from 'src/app/shared/_services/cart.service';
import { ProductsService } from 'src/app/shared/_services/products.service';
declare function addToCart(): any;

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css', './top-selling-products.component.scss']
})
export class TopSellingProductsComponent implements OnInit, AfterViewInit {
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
    if (typeof window !== 'undefined') {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
    }
  }
  innerWidth = 0;
  innerHeight = 0;
  wishList: wishList[] = [];

  private isBrowser!: boolean;

  constructor(private productsService: ProductsService, private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object) { 
    this.numbers = Array(60).fill(4);
    this.getScreenSize();

    if (this.scrWidth <= 993) {
      this.mobile = true;
    }
    if (this.mobile) {
      this.productToReturn = 3;
    }
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.productsService.getTopSellingProducts(250, 1, this.productToReturn).subscribe(data => {
      console.log(data);
      if (data) {
        console.log('this.topSellingProducts');
        console.log(data.products);
        this.topSellingProducts = data.products;
        this.productsService.topSellingProducts = data.products;
        if (this.isBrowser) {
          setTimeout(function(){
            console.log('Timeout add to cart');
            addToCart();
          }, 100);
        }
        this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe(dataWl => {
          dataWl.shopping_carts.forEach((element: any, i: number) => {
            this.wishList.push({ids: element.product.id, wishList: true});
          });
        });
      }
    });
    if (typeof window !== 'undefined') {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      
      localStorage.setItem('reload', 'true');
    }
  }

  ngAfterViewInit(): void {
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

/* addToWishList(id: number) {
  if (this.wishList.filter(w => w.ids == id).length > 0) {
    this.wishList.filter(w => w.ids == id)[0].wishList = !this.wishList.filter(w => w.ids == id)[0].wishList;
  }
  else {
    this.wishList.push({ids: id, wishList: true});
  }
} */

addToWishList(product: any) {
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

/* ngOnDestroy() {
  localStorage.setItem('reload', 'true');
} */

productDetails(id: number) {
  this.router.navigate(['/shop/details/', id])
  .then(() => {
    //window.location.reload();
  });
}

}


export interface wishList {
  ids: number,
  wishList: boolean
};