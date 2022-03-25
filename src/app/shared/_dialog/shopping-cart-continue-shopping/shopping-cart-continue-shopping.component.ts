import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-continue-shopping',
  templateUrl: './shopping-cart-continue-shopping.component.html',
  styleUrls: ['./shopping-cart-continue-shopping.component.css']
})
export class ShoppingCartContinueShoppingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShoppingCartContinueShoppingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router) { }

  ngOnInit(): void {
  }

  onViewShoppingCartClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/checkout/cart']);
  }

}

export interface DialogData {
  openShoppingCart: boolean;
  continueShopping: boolean;
}