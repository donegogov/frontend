import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { CustomerService } from 'src/app/shared/_services/customer.service';
import { TokenService } from 'src/app/shared/_services/token.service';
import { OrderService } from 'src/app/shared/_services/order.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/_services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout-username-password',
  templateUrl: './checkout-username-password.component.html',
  styleUrls: ['./checkout-username-password.component.css', '../../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css']
})
export class CheckoutUsernamePasswordComponent implements OnInit {
  minPw = 8;
  checkoutForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPw)]);
  address = new FormControl('', [Validators.required]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  zipFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  housenumberFormControl = new FormControl('');
  phoneFormControl = new FormControl('', [Validators.required]);

  establishmentAddress: any;

  formattedAddress!: string;
  formattedEstablishmentAddress!: string;

  phone!: string;

  /* options: Options={
    types: [],
    componentRestrictions: { country: 'UA' },
    bounds: new .LatLngBounds(new google.maps.LatLng(43.941160, -78.895187), new google.maps.LatLng(43.941160, -78.895187)),
    fields: [],
    strictBounds: false,
    origin: new google.maps.LatLng(43.941160, -78.895187)
  } */
  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  addressString!: string;
  private geoCoder: any;
  @ViewChild('search') public searchElementRef!: ElementRef;
  formBuilder: FormBuilder = new FormBuilder();
  street_number = "";
  address2 = "";
  city = "";
  state = "";
  country = "";
  zip = "";
  formated_address = '';
  private isBrowser!: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private customerService: CustomerService,
    private tokenService: TokenService,
    private orderService: OrderService,
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.titleService.setTitle( 'Направете Нарачка' );
        this.metaTagService.addTag(
      { name: 'description', content: 'Автоматско Пополнување На Полињата За Локација, Внесете Податоци И Купете Поклон За Вашиот Сакан' }
        );
        this.metaTagService.addTag(
      { property: 'og:title', content: 'Направете Нарачка' },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Автоматско Пополнување На Полињата За Локација, Внесете Податоци И Купете Поклон За Вашиот Сакан' },
        );
        this.metaTagService.addTag(
          { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
            );


    //this.formControl = new FormControl('', [Validators.required, Validators.email]);
    this.checkoutForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
     firstname: this.firstnameFormControl, 
     lastname: this.lastnameFormControl, 
      city: this.cityFormControl,
      address: this.address,
      zip: this.zipFormControl,
      house_number: this.housenumberFormControl,
      phone: this.phoneFormControl
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.setCurrentLocation();
      const options = {
        componentRestrictions: { country: ["MK", "DE"] },
      };
    
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('placeplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplace');
          console.log(place);
          if (place.geometry === undefined || place.geometry === null) {
            console.log('placeplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplaceplace');
          console.log(place);
            return;
          }
          this.latitude = place.geometry.location?.lat() || 1;
          this.longitude = place.geometry.location?.lng() || 1;
          this.formattedAddress = place.formatted_address || '';
          this.zip = place.formatted_address?.split(',')[place.formatted_address.split(',').length - 2].replace(/\D/g, "") || '';
          this.city = place.formatted_address?.split(',')[place.formatted_address.split(',').length - 2].replace(/[^a-zA-Z]+/g, '') || '';
          this.phone = place.formatted_phone_number || '1';
          this.zoom = 12;
        });
      });
    });
  }

  onSubmit(): void {
    var formData = this.checkoutForm.value;
    console.warn('Your order has been submitted');
    console.warn(this.checkoutForm.value);
    console.warn(this.checkoutForm.value.firstname);
    //this.checkoutForm.reset();
    if (this.checkoutForm.valid) {
      this.customerService.setBillingAddress(formData.email,
        formData.firstname,
        formData.lastname,
        formData.city,
        formData.address,
        formData.zip,
        formData.phones).subscribe(dataBillingAddress => {
        console.log('dataBillingAddressdataBillingAddressdataBillingAddressdataBillingAddressdataBillingAddress');
        console.log(dataBillingAddress);
        if (dataBillingAddress) {
          this.customerService.setShippingAddress(formData.email,
             formData.firstname,
             formData.lastname,
             formData.city,
             formData.address,
             formData.zip,
             formData.phone ).subscribe(dataShippingAddress => {
              console.log('dataShippingAddressdataShippingAddressdataShippingAddressdataShippingAddressdataShippingAddressdataShippingAddress'); 
              console.log(dataShippingAddress);
              if (dataShippingAddress) {
                this.customerService.updateCustomer(formData.email,
                  formData.firstname,
                  formData.lastname,
                  formData.city,
                  formData.address,
                  formData.zip,
                  formData.phone,
                  formData.password).subscribe(dataUpdateCustomer => {
                    console.log('dataUpdateCustomerdataUpdateCustomerdataUpdateCustomerdataUpdateCustomerdataUpdateCustomerdataUpdateCustomer');
                    console.log(dataUpdateCustomer);
                    if (dataUpdateCustomer) {
                      if (typeof window !== 'undefined') {
                      localStorage.setItem('user', '');
                      }
                      this.tokenService.getToken(false,
                        true,
                        dataUpdateCustomer.customers[0].username,
                        formData.password
                        )?.then(() => {
                          console.log('ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ITS OKAY ');
                          console.log(this.orderService.setOrder());
                          this.orderService.setOrder().subscribe((dataOrder: any) => {
                            if (dataOrder) {
                              this.router.navigate(['pages/thanks']);
                            }
                            console.log('dataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrderdataOrder'); 
                            console.log(dataOrder);
                            this.cartService.deleteShoppingCart().subscribe((dataCart: any) => {
                              console.log(dataCart);
                            });
                            //return dataOrder;
                           });;
                          
                        });
                    }
                  });
              }
             });
        }
      });
    }
  }

  private setCurrentLocation() {
    console.log('results[0]results[0]results[0]results[0]results[0]results[0]results[0]results[0]');
    console.log('geolocation' in navigator);
    if ('geolocation' in navigator) {
      console.log('results[0]results[0]results[0]results[0]results[0]results[0]results[0]results[0]');
      console.log(navigator.geolocation.getCurrentPosition)
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('[0]results[0]results[0]results[0]results[0]');
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      }, (error) => {
        console.log(error);
      });
    }
  }
  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log('results[0]results[0]results[0]results[0]results[0]results[0]results[0]results[0]');
          console.log(results);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.addressString = results[0].formatted_address;
          console.log('results[0]results[0]results[0]results[0]results[0]results[0]results[0]results[0]');
          console.log(results);
          this.formattedAddress = results[0].formatted_address || '';
          this.zip = results[0].formatted_address?.split(',')[results[0].formatted_address.split(',').length - 2].replace(/\D/g, "") || '';
          this.city = results[0].formatted_address?.split(',')[results[0].formatted_address.split(',').length - 2].replace(/[^a-zA-Z]+/g, '') || '';
        } else {
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }
    });
  }



  /* placeChangedCallback(place: any) {
    this.street_number = "";
    this.address2 = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.zip = "";
    const addressFrom = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      sublocality_level_1: "sublocality_level_1",
      administrative_area_level_1: "short_name",
      country: "long_name",
      postal_code: "short_name",
    };
    place.address_components.forEach((add: any) => {
      add.types.forEach((addType: any) => {
        if (addType == "street_number")
          this.street_number = add.short_name;
        if (addType == "route")
          this.address2 = add.long_name;
        if (addType == "locality" || addType == "sublocality_level_1")
          this.city = add.long_name;
        if (addType == "administrative_area_level_1")
          this.state = add.long_name;
        if (addType == "country")
          this.country = add.long_name;
        if (addType == "postal_code")
          this.zip = add.long_name;
      });
    });
  } */

}