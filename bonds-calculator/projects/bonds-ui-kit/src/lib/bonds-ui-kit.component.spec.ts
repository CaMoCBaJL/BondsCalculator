import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsUiKitComponent } from './bonds-ui-kit.component';

describe('BondsUiKitComponent', () => {
  let component: BondsUiKitComponent;
  let fixture: ComponentFixture<BondsUiKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondsUiKitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondsUiKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
