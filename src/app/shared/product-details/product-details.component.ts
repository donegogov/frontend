import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../_services/products.service';
declare function productDetailsModal(): any;

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

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }

  showImageByPosition = 1;
  private swipeCoord!: [number, number];
  private swipeTime!: number;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router) {
      if (!localStorage.getItem('reload')) {
        localStorage.setItem('reload', 'true');
      } else {
        this.reload = localStorage.getItem('reload') || 'false';
      }
      this.getScreenSize();

    if (this.scrWidth <= 992) {
      this.mobile = true;
    }
    if (this.mobile) {
      this.mainImageWidth = this.scrWidth;
    }
     }
  ngAfterViewInit(): void {
    
    if (this.mobile) {
      productDetailsModal();
    }
  }

  ngOnInit(): void {
    if (this.reload == 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'false');
    }
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id') || ''; 
      console.log('ID = ' + this.id);
    }); 
    this.productService.getProductById(this.id).subscribe(data => {
      console.log('getProductById');
      this.product = data.products[0];
      console.log(this.product);
    });
  }

  ngOnDestroy() {
    localStorage.setItem('reload', 'true');
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

  changeMainImg(imagePosition: number) {
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

}