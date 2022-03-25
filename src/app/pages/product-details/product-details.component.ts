import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from '../../shared/_services/products.service';
import { Title, Meta } from '@angular/platform-browser';
import { SwiperComponent } from "swiper/angular";
declare function addToCart(): any;
declare function addToCartNumberOfItems(itemsToAdd: number): any;

// import Swiper core and required modules
import SwiperCore, { EffectCreative, Lazy, Pagination, Zoom } from "swiper";
import { productAttributeIdAttributeValuesId } from '../../shared/_models/product-attribute-id-attribute-values-id';
import { CartService } from '../../shared/_services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartContinueShoppingComponent } from '../../shared/_dialog/shopping-cart-continue-shopping/shopping-cart-continue-shopping.component';
import { isPlatformBrowser } from '@angular/common';

// install Swiper modules
SwiperCore.use([EffectCreative, Lazy, Pagination, Zoom]);

declare function productDetailsModal(): any;
declare function zoomInProductDetails(event: any, position: any): any;
declare function productDetailsTopMenuRemove(): any;
declare function productDetailsTopMenuAdd(): any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', './product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('imgMobileSlider') imgMobileSlider!: ElementRef;
  id: string = '';
  product: any;
  reload = 'true';

  scrHeight:any;
  scrWidth:any;
  mobile = false;
  mainImageWidth = 600;
  firstTap: number = 0;
  secondTap: number = 0
  imageScaled = false;
  changeImg = false;
  imgThumbnailPrev!: HTMLImageElement;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (typeof window !== 'undefined') {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
    }
  }

  showImageByPosition = 1;
  private swipeCoord!: [number, number];
  private swipeTime!: number;
  moreLess: string = 'more';
  tempFullDescription = '';
  addToCartItemsNumber = 1;
  dictAttributeIdAttributeValueId: productAttributeIdAttributeValuesId[] = []; //key value pair for product attributes specifications for example which color
  //in nopcommerce every product has attribute example color and attribute values for example red green yellow ect
  showErrorMessage: boolean = false;
  wishList!: boolean;
  navigationSubscription: any;
  private isBrowser!: boolean;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    public dialog: MatDialog,
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) platformId: Object) {
      if (typeof window !== 'undefined') {
      if (!localStorage.getItem('reload')) {
        localStorage.setItem('reload', 'true');
        this.reload = 'true';
      } else {
        this.reload = localStorage.getItem('reload') || 'false';
      }
    }
      //console.log('this.reload= ' + this.reload + ' localStorage.getItem(reload)= ' + localStorage.getItem('reload') + 'OOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOO');
      this.getScreenSize();

    if (this.scrWidth <= 992) {
      this.mobile = true;
    }
    if (this.mobile) {
      this.mainImageWidth = this.scrWidth;
    }
    this.isBrowser = isPlatformBrowser(platformId);
     }
  ngAfterViewInit(): void {
    
    if (this.mobile) {
      //productDetailsModal();
    }
    if (this.isBrowser) {
      productDetailsTopMenuRemove();
    }
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') || ''; 
      console.log('ID = ' + this.id);
    });
    /* this.navigationSubscription = this.router.events.subscribe(async (e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        await this.reloadUrl('/shop/details/' + this.id);
      }
    }); */
    /* this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') || ''; 
      console.log('ID = ' + this.id);
    }); */
    /* console.log('this.reloadthis.reloadthis.reloadthis.reloadthis.reloadthis.reloadthis.reloadthis.reload'); 
    console.log(this.reload); */
    /* if (this.reload == 'true') {
      console.log('reloadreloadreloadreloadreloadreloadreloadreloadreloadreload')
      await this.reloadUrl('/shop/details/' + this.id);
      localStorage.setItem('reload', 'false');
    } */
    /* this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/shop/details/' + this.id]); // navigate to same route
   });  */
    this.productService.getProductById(this.id).subscribe(data => {
      console.log('getProductById');
      this.product = data.products[0];
      console.log(this.product);
      this.tempFullDescription = this.product.full_description.substring(3, this.product.full_description.length - 5);
      this.tempFullDescription = this.tempFullDescription.substring(0, 180);
      this.tempFullDescription += ' ... ';
      this.product.attributes.forEach((element: any, i: number) => {
        this.titleService.setTitle( this.product.name );
        this.metaTagService.addTag(
      { name: 'description', content: this.product.short_description }
        );
        this.metaTagService.addTag(
      { property: 'og:title', content: this.product.name },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: this.product.short_description },
        );
        this.metaTagService.addTag(
      { property: 'og:image', content: this.product.images[0].src },
        );
      });
      for(var i = 0; i < this.product.attributes.length; i++) {
        var attributeIdValueId: productAttributeIdAttributeValuesId = {key: this.product.attributes[i].id, value: '-1'};
        this.dictAttributeIdAttributeValueId.push(attributeIdValueId);
      }
      if (this.isBrowser) {
        setTimeout(function(){
          console.log('Timeout add to cart');
          addToCart();
        }, 100);
      }
    });

    this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe((data: any) => {
      if (data) {
        data.shopping_carts.forEach((element: any, i: number) => {
          if (element.product.id == this.product.id) {
            this.wishList = true;
          }
        });
      }
    });   
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
    localStorage.setItem('reload', 'false');
    }
    if (this.isBrowser) {
      productDetailsTopMenuAdd();
    }

      // avoid memory leaks here by cleaning up after ourselves. If we  
      // don't then we will continue to run our initialiseInvites()   
      // method on every navigationEnd event.
      if (this.navigationSubscription) {  
         this.navigationSubscription.unsubscribe();
      }
  }

  initialiseInvites() {
  }

  doubleTap(event: any) {
    if (this.firstTap == 0) {
      this.firstTap = new Date().getTime();
    }
    else 
    {
      this.secondTap = new Date().getTime();
      var diff = this.secondTap - this.firstTap;
      //alert(diff);
      this.firstTap = 0;
      if (!this.imageScaled) {
        this.imgMobileSlider.nativeElement.style.transform = 'scale(2,2)';
        this.imageScaled = true;
      } else {
        this.imgMobileSlider.nativeElement.style.transform = 'scale(1,1)';
        this.imageScaled = false;
      }
    }
  }

  modalClose() {
    this.imgMobileSlider.nativeElement.style.transform = 'scale(1,1)';
    this.firstTap = 0;
    this.secondTap = 0;
  }

  changeMainImg(imagePosition: number, imgThumbnail: HTMLImageElement) {
    if (this.imgThumbnailPrev == undefined || this.imgThumbnailPrev == null) {
      imgThumbnail.style.border = '4px solid #fb0000';
      this.imgThumbnailPrev = imgThumbnail;
    } else if (this.imgThumbnailPrev != imgThumbnail) {
      imgThumbnail.style.border = '4px solid #fb0000';
      this.imgThumbnailPrev.style.border = 'none';
      this.imgThumbnailPrev = imgThumbnail;
    }
    this.showImageByPosition = imagePosition;
    console.log('this.product.images');
    console.log(this.product.images);
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
  
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
  
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          // Do whatever you want with swipe
          if (swipe == 'next') {
            if (this.product.images.length <= this.showImageByPosition) {
              this.showImageByPosition = 1;
            } else {
              this.showImageByPosition += 1;
            }
          } else if (swipe == 'previous') {
            if (this.showImageByPosition == 1) {
              this.showImageByPosition = this.product.images.length;
            } else {
              this.showImageByPosition -= 1;
            }
          }
      }
    }
  }

  zoomInProductDetails(imgZoom: any, imgZoomResult: any) {
    if (this.isBrowser) {
      zoomInProductDetails(imgZoom, imgZoomResult);
    }
  }

  colorSquares(i: number, colorSquaresMainDiv: HTMLDivElement) {
    var colors = colorSquaresMainDiv.getElementsByTagName('div');

    for (var index = 0; index < colors.length; index++) {
      if (i != index) {
        colors[index].style.border = 'none';
      } else if (i == index) {
        colors[index].style.border = '4px solid #fb0000';
      }
    }
  }

  showMoreLess() {
    if (this.moreLess == 'more') {
      this.moreLess = 'less';
      this.tempFullDescription = this.product.full_description + ' ';
    } else if (this.moreLess == 'less') {
      this.moreLess = 'more';
      this.tempFullDescription = this.tempFullDescription.substring(0, 180);
    this.tempFullDescription += ' ... ';
    }
  }

  addToMainCartItemsNumber() {
    document.documentElement.style.setProperty('--add-to-cart-number-of-items', '\'' + this.addToCartItemsNumber.toString() + '\'');
    console.log(this.addToCartItemsNumber);
    //addToCartNumberOfItems(this.addToCartItemsNumber);
  }

  addToCartItems(control: string, attributeId: string, attributeValueId: string, event: any) {
    console.log('eventeventeventeventeventeventeventeventeventeventeventevent');
    console.log(event);
    var updated = false;
    for(var i = 0; i < this.dictAttributeIdAttributeValueId.length; i++) {
      if (this.dictAttributeIdAttributeValueId[i].key == attributeId) {
        this.dictAttributeIdAttributeValueId[i].value = attributeValueId;
        //updated = true;
      }
    }
    /* if (!updated) {
      var attributeIdValueId: productAttributeIdAttributeValuesId = {key: attributeId, value: attributeValueId};
      this.dictAttributeIdAttributeValueId.push(attributeIdValueId);
    } */
  }

  imageSquares(i: number, colorSquaresMainDiv: HTMLDivElement) {
    var images = colorSquaresMainDiv.getElementsByTagName('img');
    console.log('images.lengthimages.lengthimages.lengthimages.lengthimages.lengthimages.length');
    console.log(images.length);
    for (var index = 0; index < images.length; index++) {
      if (i != index) {
        images[index].style.border = 'none';
      } else if (i == index) {
        images[index].style.border = '4px solid #fb0000';
      }
    }
  }

  addToCartAllItems() {
    console.log('this.dictAttributeIdAttributeValueIdthis.dictAttributeIdAttributeValueIdthis.dictAttributeIdAttributeValueIdthis.dictAttributeIdAttributeValueId');
    console.log(this.dictAttributeIdAttributeValueId);
    var addToCart = true;

    for(var i = 0; i < this.dictAttributeIdAttributeValueId.length; i++) {
      if (this.dictAttributeIdAttributeValueId[i].value == '-1') {
        addToCart = false;
        this.showErrorMessage = true;
        document.documentElement.style.setProperty('--yes-no-add-to-cart', 'false');
      }
    }

    if (addToCart) {
      document.documentElement.style.setProperty('--yes-no-add-to-cart', 'true');
      this.cartService.addToWishListOrCart(this.dictAttributeIdAttributeValueId,
        this.addToCartItemsNumber.toString(), 'ShoppingCart', this.product.id.toString()).subscribe(data => {
          console.log('datadatadatadatadatadatadatadatadatadatadatadatadata');
          console.log(data);
          this.showErrorMessage = false;
          /* this.cartService.getShoppingCartItems().subscribe(cart => {
            console.log('cartcartcartcartcartcartcartcartcartcartcartcartcartcartcartcart');
            console.log(cart);
          }); */
          this.openDialog();
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShoppingCartContinueShoppingComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  wishListYn(id: number) {
    return this.wishList;
  }

  addToWishList(id: number) {
    console.log(this.wishList);
    if (!this.wishList) {
      this.wishList = true;
      var tempDictAttributeIdAttributeValueId: productAttributeIdAttributeValuesId[] = [];
      for(var i = 0; i < this.product.attributes.length; i++) {
        var attributeIdValueId: productAttributeIdAttributeValuesId = {key: this.product.attributes[i].id, value: this.product.attributes[i].attribute_values[0].id};
        tempDictAttributeIdAttributeValueId.push(attributeIdValueId);
      }
      this.cartService.addToWishListOrCart(tempDictAttributeIdAttributeValueId,
        '1', 'Wishlist', this.product.id.toString()).subscribe(data => {
          console.log('datadatadatadatadatadatadatadatadatadatadatadatadata');
          console.log(data);
          this.showErrorMessage = false;
        });
      return true;
    }
    else {
      this.wishList = false;
      this.cartService.getWishlistShoppingCartItems('Wishlist').subscribe((data: any) => {
        if (data) {
          data.shopping_carts.forEach((element: any, i: number) => {
            if (element.product.id == this.product.id) {
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

  async reloadUrl(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/not-found', { skipLocationChange: true });
    return await this.router.navigateByUrl(url);
  }

}
