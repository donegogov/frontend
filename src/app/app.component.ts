import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './shared/_services/loading.service';
import { TokenService } from './shared/_services/token.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Добредојдовте во АК Продавница';

  constructor(private router: Router,
    private tokenService: TokenService,
    public loadingService: LoadingService,
    private titleService: Title,
    private metaTagService: Meta) { }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Elektronska Prodavnica, Prodavnica, Racno Izraboteni Produkti, Pliko' },
      { name: 'author', content: 'Done Gogov' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
    this.metaTagService.addTag(
      { name: 'description', content: 'Овде Можете Да Најдете Секаков Вид На Домашно Рачно Изработени Продукти' }
    );
    this.metaTagService.addTag(
      { property: 'og:title', content: this.title },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Овде Можете Да Најдете Секаков Вид На Домашно Рачно Изработени Продукти' },
        );
        this.metaTagService.addTag(
      { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
        );
  }

  shoppingCart() {
    this.router.navigate(['/shop/cart'])
    .then(() => {
      //window.location.reload();
    });
  }

  ngOnDestroy() {
    this.tokenService.unsubscribe();
    this.loadingService.unsubscribe();
  }
}
