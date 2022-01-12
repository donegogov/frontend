import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    center: true,
    lazyLoad: true,
    lazyLoadEager: 2,
    autoplay: true,
    autoplayHoverPause: true,
    animateOut: "",
    animateIn: "",
    navSpeed: 700,
    navText: ['', ''],
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

  constructor(private elRef: ElementRef) { }
  @ViewChild('owlCar') owlCar!: any;

  ngOnInit(): void {
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
        var ratioImage = width / height;

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

}


/* if(width > maxWidth){
  ratio = maxWidth / width;   // get ratio for scaling image
  (image as ElementRef).nativeElement.setAttribute('style', 'width: ' + maxWidth + 'px !important'); // Set new width
  (image as ElementRef).nativeElement.setAttribute('style', 'height: ' + (height * ratio) + 'px !important');  // Scale height based on ratio
  height = height * ratio;    // Reset height to match scaled image
  width = width * ratio;    // Reset width to match scaled image
}

// Check if current height is larger than max
if(height > maxHeight){
  ratio = maxHeight / height; // get ratio for scaling image
  (image as ElementRef).nativeElement.setAttribute('style', 'height: ' + maxHeight + 'px !important');   // Set new height
  (image as ElementRef).nativeElement.setAttribute('style', 'width: ' + (width * ratio) + 'px !important');    // Scale width based on ratio
  width = width * ratio;    // Reset width to match scaled image
  height = height * ratio;    // Reset height to match scaled image
} */