import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ListProducts } from 'src/app/shared/_models/list-products';
import { productAttributeIdAttributeValuesId } from 'src/app/shared/_models/product-attribute-id-attribute-values-id';
import { ProductsTopSelling } from 'src/app/shared/_models/products-top-selling';
import { CartService } from 'src/app/shared/_services/cart.service';
import { ProductsService } from 'src/app/shared/_services/products.service';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from 'src/app/shared/_services/token.service';
/* declare function addToCart(): any; */

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css', './wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishListroducts: ProductsTopSelling[] = 
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
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private tokenService: TokenService,
    private titleService: Title,
    private metaTagService: Meta) { 
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
    this.titleService.setTitle( 'Омилени Продукти' );
        this.metaTagService.addTag(
      { name: 'description', content: 'Погледнете Ги Вашите Омилени Продукти, Споделете Го Со Некој Ваш Пријател' }
        );
        this.metaTagService.addTag(
      { property: 'og:title', content: 'Омилени Продукти' },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Погледнете Ги Вашите Омилени Продукти, Споделете Го Со Некој Ваш Пријател' },
        );
        this.metaTagService.addTag(
          { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
            );
            if(this.isBrowser && this.tokenService.isLogedIn()) {
    this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe(data => {
      console.log(data);
      if (data) {
        this.wishListroducts = [];
        data.shopping_carts.forEach((element: any, i: number) => {
          this.wishListroducts.push(element.product);
        });
        console.log('this.topSellingProductsthis.topSellingProductsthis.topSellingProductsthis.topSellingProductsthis.topSellingProducts');
        console.log(this.wishListroducts);
        /* 
        console.log('this.topSellingProducts');
        console.log(data.products);
        this.topSellingProducts = data.products;
        this.productsService.topSellingProducts = data.products; */
        /* setTimeout(function(){
          console.log('Timeout add to cart');
          addToCart();
        }, 100); */
        this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe(dataWl => {
          dataWl.shopping_carts.forEach((element: any, i: number) => {
            this.wishList.push({ids: element.product.id, wishList: true});
          });
        });
      }
    });
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
  }
  }

  ngAfterViewInit(): void {
  }

 loadScript(event: any) {
  if(this.isBrowser && this.tokenService.isLogedIn()) {
  console.log('event');
  console.log(event.target.children[0].children);
  //script.text = 'imageZoom(' + product.id + ', result' + product.id + ');';
    if (this.isLoadedScript) {
    this.wishListroducts.forEach(element => {
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

/* addToWishList(id: number) {
  if (this.wishList.filter(w => w.ids == id).length > 0) {
    this.wishList.filter(w => w.ids == id)[0].wishList = !this.wishList.filter(w => w.ids == id)[0].wishList;
  }
  else {
    this.wishList.push({ids: id, wishList: true});
  }
} */

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
        this.ngOnInit();
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
              this.ngOnInit();
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
  /* console.log('this.wishList.filter(w => w.ids == id)');
  console.log(this.wishList.filter(w => w.ids == id)); */
  if (this.wishList.filter(w => w.ids == id).length > 0) {
    return this.wishList.filter(w => w.ids == id)[0].wishList;
  }
  else {
    return false;
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