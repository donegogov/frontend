import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutUsernamePasswordComponent } from './checkout-username-password.component';

describe('CheckoutUsernamePasswordComponent', () => {
  let component: CheckoutUsernamePasswordComponent;
  let fixture: ComponentFixture<CheckoutUsernamePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutUsernamePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutUsernamePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
