import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router) { }

  ngOnInit(): void {
  }


  onLoginOrRegisterClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/account']);
  }

}

export interface DialogData {
openShoppingCart: boolean;
continueShopping: boolean;
}