import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedShopComponent } from './animated-shop.component';

describe('AnimatedShopComponent', () => {
  let component: AnimatedShopComponent;
  let fixture: ComponentFixture<AnimatedShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
