import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTitleComponent } from './shop-title.component';

describe('ShopTitleComponent', () => {
  let component: ShopTitleComponent;
  let fixture: ComponentFixture<ShopTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
