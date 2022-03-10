import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { ProductsTopSelling } from 'src/app/shared/_models/products-top-selling';
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
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  innerWidth = 0;
  innerHeight = 0;
  wishList: wishList[] = [];

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
    this.productsService.getTopSellingProducts(250, 1, this.productToReturn).subscribe(data => {
      console.log(data);
      if (data) {
        console.log('this.topSellingProducts');
        console.log(data.products);
        this.topSellingProducts = data.products;
        this.productsService.topSellingProducts = data.products;
        setTimeout(function(){
          console.log('Timeout add to cart');
          addToCart();
        }, 100);
      }
    });
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
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

}


export interface wishList {
  ids: number,
  wishList: boolean
};