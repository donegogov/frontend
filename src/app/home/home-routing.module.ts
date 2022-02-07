import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchProductComponent } from '../shared/components/search-product/search-product.component';
import { SearchProductResolver } from '../shared/_resolvers/search-product.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
