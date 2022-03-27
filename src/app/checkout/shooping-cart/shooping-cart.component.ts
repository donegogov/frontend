import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from 'src/app/shared/_services/cart.service';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from 'src/app/shared/_services/token.service';

@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.css']
})
export class ShoopingCartComponent implements OnInit {
  shoppingCartItems!: any[];
  attribute: productAttributes[] = [];
  quantityModel!: number;
  private isBrowser!: boolean;

  constructor(private cartService: CartService,
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) platformId: Object,
    private tokenService: TokenService) { 
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    if (this.isBrowser && this.tokenService.isLogedIn()) {
    this.cartService.getShoppingCartItems().subscribe(data => {
      if (data) {
        console.log(data);
        this.shoppingCartItems = data.shopping_carts;
        //product atributite se vo product_attributes kako id i value no trebaat po ima i ovdeka gi mapiram i productot e vnesen vo kart item so site
        //atributi i nivni vrednost
        this.shoppingCartItems.forEach((cartItem, index) => {
          var product = cartItem.product;
          var attr: productAttribute[] = [];
          var productAttr: productAttributes;
          cartItem.product_attributes.forEach((attributes: any, i: number) => {
            product.attributes.forEach((productAttribute: any, productAttributeIndex: number) => {
              if (productAttribute.id == attributes.id) {
              productAttribute.attribute_values.forEach((attributeValues: any, attributeValuesIndex: number) => {
                if(attributeValues.id == attributes.value) {
                  var tempAttributes: productAttribute = {
                    attributeName: productAttribute.product_attribute_name,
                    attributeValue: attributeValues.name
                  };
                  attr.push(tempAttributes);
                  } 
              });
            }
            });
          });
          var tempPattr: productAttributes = {
            attributes: attr
          }
          this.attribute.push(tempPattr);
        });
        console.log('this.attributethis.attributethis.attributethis.attributethis.attributethis.attribute');
        console.log(this.attribute);
      }
    });
  }
    this.titleService.setTitle( 'Кошничка' );
        this.metaTagService.addTag(
      { name: 'description', content: 'Погледнете Ја Вашата Кошничка, Зголемете Број На Продукти, И Многу Повеќе' }
        );
        this.metaTagService.addTag(
      { property: 'og:title', content: 'Кошничка' },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Погледнете Ја Вашата Кошничка, Зголемете Број На Продукти, И Многу Повеќе' },
        );
        this.metaTagService.addTag(
          { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
            );
      
  }

  deleteItem(cartItemId: string) {
    if (this.isBrowser && this.tokenService.isLogedIn()) {
    this.cartService.deleteWishlistCartItem(cartItemId).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
  }

  updateQuantity(event: string, cartItemId: string) {
    if (this.isBrowser && this.tokenService.isLogedIn()) {
    console.log(event);
    this.cartService.updateShoppingCartQuantity(event, cartItemId).subscribe(data => {
      console.log(data);
    });
  }
  }

}

export interface productAttribute {
  attributeName: string;
  attributeValue: string;
}

export interface productAttributes {
  attributes: productAttribute[];
}