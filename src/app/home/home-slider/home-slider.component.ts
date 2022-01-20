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
    loop: true,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: true,
    dots: false,
    center: true,
    lazyLoad: true,
    lazyLoadEager: 1,
    autoplay: true,
    autoplayHoverPause: true,
    animateOut: "fadeOut 0.1s linear",
    animateIn: false,
    navSpeed: 700,
    navText: ['', ''],
    smartSpeed: 1000,
    autoplaySpeed: true,
    autoplayTimeout: 2000,
    fluidSpeed: true,
    autoHeight: true,
    responsive: {
      993: {
        items: 1,
        loop: true,
        rewind: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: false,
        freeDrag: false,
        dots: false,
        center: true,
        autoplay: true,
        animateOut: false,
        animateIn: false,
        navSpeed: 500,
        smartSpeed: undefined,
        autoplaySpeed: 6000,
        fluidSpeed: false,
        autoHeight: true,
        nav: false,
      }
    },
    nav: false,
    items: 1
  }
  imagesLoad = 0;
  @ViewChild('owlCar') owlCar!: any;
  @ViewChildren('contentSliderh1') contentSliderh1!: QueryList<ElementRef>;
  @ViewChildren('contentSliderh4') contentSliderh4!: QueryList<ElementRef>;
  @ViewChildren('contentSliderButton') contentSliderButton!: QueryList<ElementRef>;

  sliderContent: any = [
    {
      title: "BOOK",
      subTitle: "BOOK SUBTITLE",
      buttonText: "ADD TO CART",
      imageSrc: "../../../assets/images/slider/1.7.jpg"
    },
    {
      title: "BOOK 2",
      subTitle: "BOOK SUBTITLE",
      buttonText: "ADD TO CART",
      imageSrc: "../../../assets/images/slider/1.8.jpg"
    },
    {
      title: "BOOK 3",
      subTitle: "BOOK SUBTITLE",
      buttonText: "ADD TO CART",
      imageSrc: "../../../assets/images/slider/1.9.jpg"
    }
  ];
  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }

  constructor(private elRef: ElementRef, private _elementRef : ElementRef) {
    this.getScreenSize();
   }
  

ngOnInit(): void {
    
}

  ngAfterViewInit() {
  }

  changeImageDimension(image: any) {
    if (this.scrWidth > 993) {
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
      } else {
        (image as HTMLElement).style.width = (this.scrWidth - 100) + 'px';
        (image as HTMLElement).style.height = '1200px';
        //(image as HTMLElement).style.borderRadius = '50%';
      }
  }

getData(data: any) {
  var tempIndex = data.startPosition ?? 0;
  if ( tempIndex === 0) {
    var allSliderContent = this._elementRef.nativeElement.querySelectorAll('.owl-item:not(.cloned) .slider-content');
    var momentSliderContent = allSliderContent[tempIndex] as HTMLElement;
    var previousSliderContent = allSliderContent[allSliderContent.length - 1] as HTMLElement;

    this.handlePreviousSlide(previousSliderContent);
    this.handleMomentSlide(momentSliderContent);
  } else {
    var allSliderContent = this._elementRef.nativeElement.querySelectorAll('.owl-item:not(.cloned) .slider-content');
    var momentSliderContent = allSliderContent[tempIndex] as HTMLElement;
    var previousSliderContent = allSliderContent[tempIndex - 1] as HTMLElement;
    
    this.handlePreviousSlide(previousSliderContent);
    this.handleMomentSlide(momentSliderContent);

    /* if (this.scrWidth <= 993) {
      momentSliderContent.getElementsByTagName('img')[0].style.width = (this.scrWidth - 100) + 'px';
      momentSliderContent.getElementsByTagName('img')[0].style.height = '1200px';
    } */
  }
}

handleMomentSlide(momentSliderContent: HTMLElement) {
    //void domElement[tempIndex].offsetHeight; 
    void momentSliderContent.getElementsByTagName('h1')[0].offsetHeight;
    void momentSliderContent.getElementsByTagName('h4')[0].offsetHeight;
    void momentSliderContent.getElementsByTagName('button')[0].offsetHeight;
    void momentSliderContent.getElementsByTagName('img')[0].offsetHeight;

    momentSliderContent.getElementsByTagName('h1')[0].classList.add("slider-title");
    momentSliderContent.getElementsByTagName('h4')[0].classList.add("slider-subtitle");
    momentSliderContent.getElementsByTagName('button')[0].classList.add("slider-button");
    momentSliderContent.getElementsByTagName('img')[0].classList.add("slider-image");


    momentSliderContent.getElementsByTagName('h1')[0].onanimationstart = () => {
      momentSliderContent.getElementsByTagName('h1')[0].style.opacity = '1';
      //momentSliderContent.getElementsByTagName('h1')[0].style.visibility = 'visible';
    };
    momentSliderContent.getElementsByTagName('h4')[0].onanimationstart = () => {
      momentSliderContent.getElementsByTagName('h4')[0].style.opacity = '1';
      //momentSliderContent.getElementsByTagName('h4')[0].style.visibility = 'visible';
    };
    momentSliderContent.getElementsByTagName('button')[0].onanimationstart = () => {
      momentSliderContent.getElementsByTagName('button')[0].style.opacity = '1';
      //momentSliderContent.getElementsByTagName('button')[0].style.visibility = 'visible';
    };
    momentSliderContent.getElementsByTagName('img')[0].onanimationstart = () => {
      momentSliderContent.getElementsByTagName('img')[0].style.opacity = '1';
      //momentSliderContent.getElementsByTagName('img')[0].style.visibility = 'visible';
    };
}

handlePreviousSlide(previousSliderContent: HTMLElement) {
  previousSliderContent.getElementsByTagName('h1')[0].classList.remove("slider-title");
  previousSliderContent.getElementsByTagName('h4')[0].classList.remove("slider-subtitle");
  previousSliderContent.getElementsByTagName('button')[0].classList.remove("slider-button");
    previousSliderContent.getElementsByTagName('img')[0].classList.remove("slider-image");

  previousSliderContent.getElementsByTagName('h1')[0].style.opacity = '0';
  previousSliderContent.getElementsByTagName('h4')[0].style.opacity = '0';
  previousSliderContent.getElementsByTagName('button')[0].style.opacity = '0';
  previousSliderContent.getElementsByTagName('img')[0].style.opacity = '0';
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