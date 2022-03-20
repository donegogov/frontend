import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './shared/_services/loading.service';
import { TokenService } from './shared/_services/token.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private router: Router,
    private tokenService: TokenService,
    public loadingService: LoadingService) { }

  shoppingCart() {
    this.router.navigate(['/shop/cart'])
    .then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.tokenService.unsubscribe();
  }
}
