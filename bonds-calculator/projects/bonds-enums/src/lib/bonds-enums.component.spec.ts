import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsEnumsComponent } from './bonds-enums.component';

describe('BondsEnumsComponent', () => {
  let component: BondsEnumsComponent;
  let fixture: ComponentFixture<BondsEnumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondsEnumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondsEnumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
