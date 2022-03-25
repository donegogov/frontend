import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Token } from 'src/app/shared/_models/token';
import { CustomerService } from 'src/app/shared/_services/customer.service';
import { TokenService } from 'src/app/shared/_services/token.service';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private tokenService: TokenService,
    private customerService: CustomerService,
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) platformId: Object) { }

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
          if (typeof window !== 'undefined') {
        localStorage.setItem('user', '');
          }
        this.tokenService.getToken(false, true, this.loginFrom.value.email, this.loginFrom.value.password)?.then(() =>{
          if (typeof window !== 'undefined') {
          if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
            this.errorLogin = true;
            this.tokenService.getToken(true, true, 'username', 'password');
          }
        }
        });

      } else if (event.submitter.innerText == 'Register') {
        this.customerService.updateCustomer(this.loginFrom.value.email, 'test', 'test', 'test', 'test', '1000', '1234567890', this.loginFrom.value.password).subscribe(dataRegister => {
          console.log(dataRegister);
          if (typeof window !== 'undefined') {
          localStorage.setItem('user', '');
          }
        this.tokenService.getToken(false, true, this.loginFrom.value.email, this.loginFrom.value.password)?.then(() =>{
          if (typeof window !== 'undefined') {
          if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
            this.tokenService.getToken(true, true, 'username', 'password');
          }
        }
        });
        });
      }
    }
  }
  }

  logout() {
    if (typeof window !== 'undefined') {
    localStorage.setItem('user', '');
    }
    this.tokenService.getToken(true, true, 'username', 'password');
  }

  showLoginRegisterForm() {
    let currentUser!: Token;

    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if (currentUser.username != '' && currentUser.username != null) {
      this.showLoginRegister = false;
      return false;
    }
    return true;
  }

}
