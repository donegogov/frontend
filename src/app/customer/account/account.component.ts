import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Token } from 'src/app/shared/_models/token';
import { CustomerService } from 'src/app/shared/_services/customer.service';
import { TokenService } from 'src/app/shared/_services/token.service';

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

  constructor(private tokenService: TokenService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
    let currentUser!: Token;

    this.tokenService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    if (currentUser.username != '' && currentUser.username != null) {
      this.showLoginRegister = false;
    }
  }

  onSubmit(event: any): void {
    this.errorLogin = false;
    console.log(event.submitter.innerText);
    if (this.loginFrom.valid) {
      if (event.submitter.innerText == 'Login') {
        localStorage.setItem('user', '');
        this.tokenService.getToken(false, true, this.loginFrom.value.email, this.loginFrom.value.password)?.then(() =>{
          if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
            this.errorLogin = true;
            this.tokenService.getToken(true, true, 'username', 'password');
          }
        });

      } else if (event.submitter.innerText == 'Register') {
        this.customerService.updateCustomer(this.loginFrom.value.email, 'test', 'test', 'test', 'test', '1000', '1234567890', this.loginFrom.value.password).subscribe(dataRegister => {
          console.log(dataRegister);
        });
      }
    }
  }

}
