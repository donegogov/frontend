import { TestBed } from '@angular/core/testing';

import { SearchProductResolver } from './search-product.resolver';

describe('SearchProductResolver', () => {
  let resolver: SearchProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SearchProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
