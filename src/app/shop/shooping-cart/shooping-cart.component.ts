import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/_services/cart.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.css']
})
export class ShoopingCartComponent implements OnInit {
  shoppingCartItems!: any[];
  attribute: productAttributes[] = [];
  quantityModel!: number;

  constructor(private cartService: CartService,
    private titleService: Title,
    private metaTagService: Meta) { }

  ngOnInit(): void {
    this.cartService.getShoppingCartItems().subscribe(data => {
      if (data) {
        console.log(data);
        this.shoppingCartItems = data.shopping_carts;
        //product atributite se vo product_attributes kako id i value no trebaat po ima i ovdeka gi mapiram i productot e vnesen vo kart item so site
        //atributi i nivni vrednost
        this.shoppingCartItems.forEach((cartItem, index) => {
          var product = cartItem.product;
          var attr: productAttribute[] = [];
                    /* attr.push(tempAttributes); */
                    var productAttr: productAttributes; /* = {
                      attributes: attr
                     }*/
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
                  /* if (this.attribute[index] != undefined) {
                    this.attribute[index].attributes.push(tempAttributes);
                  } else if (this.attribute[index] == undefined) {
                    }
                    attr.push(tempAttributes);
                    //this.attribute.push(attr);
                  */} 
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
    this.titleService.setTitle( 'Кошничка' );
        this.metaTagService.updateTag(
      { name: 'description', content: 'Погледнете Ја Вашата Кошничка, Зголемете Број На Продукти, И Многу Повеќе' }
        );
        this.metaTagService.updateTag(
      { name: 'og:title', content: 'Кошничка' },
        );
        this.metaTagService.updateTag(
      { name: 'og:description', content: 'Погледнете Ја Вашата Кошничка, Зголемете Број На Продукти, И Многу Повеќе' },
        );
        /* this.metaTagService.updateTag(
      { name: 'og:image', content: this.product.images[0].src },
        ); */
      
  }

  deleteItem(cartItemId: string) {
    this.cartService.deleteWishlistCartItem(cartItemId).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  updateQuantity(event: string, cartItemId: string) {
    console.log(event);
    this.cartService.updateShoppingCartQuantity(event, cartItemId).subscribe(data => {
      console.log(data);
    });
  }

}

export interface productAttribute {
  attributeName: string;
  attributeValue: string;
}

export interface productAttributes {
  attributes: productAttribute[];
}