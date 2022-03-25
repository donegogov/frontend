import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
declare function notFound(): any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngAfterViewInit(): void {
    if(this.isBrowser) {
      setTimeout(function(){
        console.log('Timeout not found');
        notFound();
      }, 10);
    }
  }

  ngOnInit(): void {
  }

}
