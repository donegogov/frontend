import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var magic_menu: any;

@Component({
  selector: 'app-magic-main-menu',
  templateUrl: './magic-main-menu.component.html',
  styleUrls: ['./magic-main-menu.component.css']
})
export class MagicMainMenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    magic_menu();
  }

}
