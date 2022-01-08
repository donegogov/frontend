import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicMainMenuComponent } from './magic-main-menu.component';

describe('MagicMainMenuComponent', () => {
  let component: MagicMainMenuComponent;
  let fixture: ComponentFixture<MagicMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
