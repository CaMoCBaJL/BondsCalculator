import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsEntitiesComponent } from './bonds-entities.component';

describe('BondsEntitiesComponent', () => {
  let component: BondsEntitiesComponent;
  let fixture: ComponentFixture<BondsEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondsEntitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondsEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
