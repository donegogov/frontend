import { AfterViewInit, Component, OnInit } from '@angular/core';
declare function notFound(): any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(function(){
      console.log('Timeout not found');
      notFound();
    }, 10);
  }

  ngOnInit(): void {
  }

}
