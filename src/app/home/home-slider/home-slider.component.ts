import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OwlOptions, SlideModel, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit, AfterViewInit {
  customOptions: OwlOptions = {
    loop: false,
    rewind: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: true,
    dots: false,
    center: true,
    lazyLoad: true,
    lazyLoadEager: 2,
    autoplay: false,
    autoplayHoverPause: false,
    animateOut: false,
    animateIn: false,
    navSpeed: 700,
    navText: ['', ''],
    smartSpeed: 2000,
    slideTransition: "linear",
    autoplaySpeed: false,
    autoplayTimeout: 2000,
    fluidSpeed: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  imagesLoad = 0;
  @ViewChild('owlCar') owlCar!: any;
  @ViewChildren('contentSliderh1') contentSliderh1!: QueryList<ElementRef>;
  @ViewChildren('contentSliderh4') contentSliderh4!: QueryList<ElementRef>;
  @ViewChildren('contentSliderButton') contentSliderButton!: QueryList<ElementRef>;

  constructor(private elRef: ElementRef) { }
  

ngOnInit(): void {
    
}

  ngAfterViewInit() {
    this.contentSliderh1.forEach(element => {
      element.nativeElement.onanimationstart = () => {
        element.nativeElement.style.opacity = 1;
      };
    });
    this.contentSliderh4.forEach(element => {
      element.nativeElement.onanimationstart = () => {
        element.nativeElement.style.opacity = 1;
      };
    });
    this.contentSliderButton.forEach(element => {
      element.nativeElement.onanimationstart = () => {
        element.nativeElement.style.opacity = 1;
      };
    });
  }

  changeImageDimension(image: any) {
    //console.log(image.nativeElement.offsetHeight);
    (image as HTMLImageElement).width = 800;
    console.log((image as HTMLImageElement).offsetHeight);
    console.log((this.owlCar.el.nativeElement as HTMLElement).offsetWidth);


    var maxWidth = (this.owlCar.el.nativeElement as HTMLElement).offsetWidth; // Max width for the image
        var maxHeight = 718;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = (image as HTMLImageElement).offsetWidth;    // Current image width
        var height = (image as HTMLImageElement).offsetHeight;  // Current image height

        // Check if the current width is larger than the max
        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            (image as HTMLElement).style.width =  maxWidth + 'px'; // Set new width
            (image as HTMLElement).style.height = (height * ratio) + 'px';  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            (image as HTMLElement).style.height = maxHeight + 'px';   // Set new height
            (image as HTMLElement).style.width = (width * ratio) + 'px';    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }
  }

getData(data: SlidesOutputData) {
  //this.customOptions.animateIn = "animate__animated animate__" + this.getAnimation().toString();
  //this.customOptions.animateOut = "animate__animated animate__" + this.getAnimation().toString();
  /* console.log(this.owlCar.options);
  const anyService = this.owlCar as any;
 const carouselService = anyService.carouselService as CarouselService;
  var tempOptions = this.customOptions;
  carouselService.setOptions(this.customOptions);
  carouselService.refresh(); */
  //carouselService.update();
}

getAnimation() {
  var allAnimations = [
    'bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat','backInDown', 
    'backInLeft', 'backInRight', 'backInUp', 'backOutDown', 
    'backOutLeft', 'backOutRight', 'backOutUp', 'bounceIn', 
    'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 
    'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 
    'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig',
    'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight', 'fadeOut', 
    'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 
    'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft', 'flip', 
    'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedInRight', 
    'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateIn', 
    'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 
    'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'hinge', 
    'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 
    'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 
    'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp',
    'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
  ];

  return allAnimations[Math.floor(Math.random()*allAnimations.length)];
}

}