import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartContinueShoppingComponent } from './shopping-cart-continue-shopping.component';

describe('ShoppingCartContinueShoppingComponent', () => {
  let component: ShoppingCartContinueShoppingComponent;
  let fixture: ComponentFixture<ShoppingCartContinueShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartContinueShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartContinueShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
