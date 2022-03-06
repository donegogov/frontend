import { TestBed } from '@angular/core/testing';

import { PriceFromToResolver } from './price-from-to.resolver';

describe('PriceFromToResolver', () => {
  let resolver: PriceFromToResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PriceFromToResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
