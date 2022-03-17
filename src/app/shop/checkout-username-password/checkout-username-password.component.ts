import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare function longtitute(): any;
declare function latitute(): any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-checkout-username-password',
  templateUrl: './checkout-username-password.component.html',
  styleUrls: ['./checkout-username-password.component.css']
})
export class CheckoutUsernamePasswordComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  minPw = 8;
  checkoutForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPw)]);

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
  address!: string;
  private geoCoder: any;
  @ViewChild('search') public searchElementRef!: ElementRef;
  formBuilder: FormBuilder = new FormBuilder();
  street_number = "";
  address2 = "";
  city = "";
  state = "";
  country = "";
  zip = "";

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    //this.formControl = new FormControl('', [Validators.required, Validators.email]);
    this.checkoutForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      const options = {
        componentRestrictions: { country: "MK" },
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
          this.address2 = place.formatted_address || '';
          this.zip = place.formatted_address?.split(',')[1].replace(/\D/g, "") || '';
          this.phone = place.formatted_phone_number || '1';
          this.zoom = 12;
        });
      });
    });
  }

  onSubmit(): void {
    console.warn('Your order has been submitted');
    console.warn(this.checkoutForm.value);
    //this.checkoutForm.reset();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
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