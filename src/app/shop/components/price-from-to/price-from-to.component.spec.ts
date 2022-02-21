import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFromToComponent } from './price-from-to.component';

describe('PriceFromToComponent', () => {
  let component: PriceFromToComponent;
  let fixture: ComponentFixture<PriceFromToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceFromToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFromToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
