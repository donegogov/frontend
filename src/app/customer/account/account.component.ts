import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/_services/customer.service';
import { TokenService } from 'src/app/shared/_services/token.service';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  minPw = 8;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPw)]);

  formBuilder: FormBuilder = new FormBuilder();
  loginFrom!: FormGroup;

  errorLogin = false;
  showLoginRegister = true;
  private isBrowser!: boolean;
  loginRegisterMessage = '';
  showELoginRegisterMessage = false;

  constructor(private tokenService: TokenService,
    private customerService: CustomerService,
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) platformId: Object,
    private cookieService: CookieService) {
      this.isBrowser = isPlatformBrowser(platformId);
     }

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.titleService.setTitle('Акаунт Најава Креирање Сметка Погледнете Ги Нарачките');
    this.metaTagService.addTag(
      { name: 'description', content: 'Најавете Се, Ако Немате Кориснички Профил Креирајте Сметка Погледнете Ја Историјата На Нарачките' }
    );
    this.metaTagService.addTag(
      { property: 'og:title', content: 'Акаунт Најава Креирање Сметка Погледнете Ги Нарачките' },
        );
        this.metaTagService.addTag(
      { property:  'og:description', content: 'Најавете Се, Ако Немате Кориснички Профил Креирајте Сметка Погледнете Ја Историјата На Нарачките' },
        );
        this.metaTagService.addTag(
      { property: 'og:image', content: 'https://i.postimg.cc/CLfMNj6R/243186359-375976900673318-3226717078933501191-n.png' },
        );
  }

  onSubmit(event: any): void {
    if (this.isBrowser) {
    this.errorLogin = false;
    console.log(event.submitter.innerText);
    if (this.loginFrom.valid) {
      if (event.submitter.innerText == 'Login') {
            this.cookieService.put('access_token', '')
        this.tokenService.getToken(false, true, this.loginFrom.value.email, this.loginFrom.value.password)?.then(() =>{
          if (this.cookieService.hasKey('access_token') && this.cookieService.get('access_token') != null && this.cookieService.get('access_token') != undefined && this.cookieService.get('access_token') != '') {
            this.loginRegisterMessage = 'Welcome ' + this.cookieService.get('username');
            this.showELoginRegisterMessage = true;
          } else {
            this.loginRegisterMessage = 'Error during login';
            this.showELoginRegisterMessage = true;
          }
        }).catch(err => {
          if (this.cookieService.hasKey('access_token') && this.cookieService.get('access_token') != null && this.cookieService.get('access_token') != undefined && this.cookieService.get('access_token') != '') {
            this.loginRegisterMessage = 'Welcome ' + this.cookieService.get('username');
            this.showELoginRegisterMessage = true;
          } else {
            this.loginRegisterMessage = 'Error during login';
            this.showELoginRegisterMessage = true;
          }
        });

      } else if (event.submitter.innerText == 'Register') {
        this.tokenService.getToken(true, true, 'username', 'password')?.then(() =>{
          this.customerService.updateCustomer(this.loginFrom.value.email, 'test', 'test', 'test', 'test','1000', '1234567890', this.loginFrom.value.password).subscribe(dataRegister => {
            console.log(dataRegister);
            this.cookieService.put('access_token', '');
            this.tokenService.getToken(false, true, this.loginFrom.value.email, this.loginFrom.value.password)?.then(() =>{
              if (this.cookieService.hasKey('access_token') && this.cookieService.get('access_token') != null && this.cookieService.get('access_token') != undefined && this.cookieService.get('access_token') != '') {
                this.loginRegisterMessage = 'Welcome ' + this.cookieService.get('username');
                this.showELoginRegisterMessage = true;
              } else {
                this.loginRegisterMessage = 'Error during registration';
                this.showELoginRegisterMessage = true;
              }
          });
        });
        });
        
      }
    }
  }
  }

  logout() {
    if (this.isBrowser) {
    //localStorage.setItem('user', '');
    
    this.cookieService.put('access_token', '');
  }
  }

  showLoginRegisterForm() {
    console.log('this.tokenService.isLogedIn()');
    console.log(this.tokenService.isLogedIn());
      return !this.tokenService.isLogedIn();
  }
}
