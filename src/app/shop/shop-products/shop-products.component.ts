import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsPricing } from 'src/app/shared/_models/products-pricing';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css', './shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {
  From = 'From';
  To = 'To';
  productPricing!: ProductsPricing[];
  categoryIds: number[] = [];
  searchTearms: string[] = [];
  priceFromTo: number[] = [];

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log('data[productPricing]');
      console.log(data['productPricing']);
      this.productPricing = data['productPricing'].products;
    });

    this.titleService.setTitle('Купувајте Пребарувајте Зумирајте Додадете Во Омилени');
    this.metaTagService.addTag(
      { name: 'description', content: 'Пребарувајте На Неколку Начини, Зумирајте, Додадете Продукт Во Вашите Омилени И Многу Повеќе' }
    );
    this.metaTagService.addTag(
      { property: 'og:title', content: 'Купувајте Пребарувајте Зумирајте Додадете Во Омилени' },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Пребарувајте На Неколку Начини, Зумирајте, Додадете Продукт Во Вашите Омилени И Многу Повеќе' },
        );
        this.metaTagService.addTag(
          { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
            );
  }

  public categoryPicked(categoryIds: number[]):void {
    this.categoryIds = categoryIds;
    console.log('Picked categories: ', categoryIds.toString());
  }

  public searchTearmPicked(searchTearms: string[]):void {
    this.searchTearms = searchTearms;
    console.log('Picked search tearms: ', searchTearms.toString());
  }

  public pricePicked(priceFromTo: number[]):void {
    this.priceFromTo = priceFromTo;
    console.log('Picked price: ', priceFromTo.toString());
  }


}
