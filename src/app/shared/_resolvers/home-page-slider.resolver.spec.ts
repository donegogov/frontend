import { TestBed } from '@angular/core/testing';

import { HomePageSliderResolver } from './home-page-slider.resolver';

describe('HomePageSliderResolver', () => {
  let resolver: HomePageSliderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomePageSliderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
