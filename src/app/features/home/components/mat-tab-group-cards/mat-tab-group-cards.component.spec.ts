import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTabGroupCardsComponent } from './mat-tab-group-cards.component';

describe('MatTabGroupCardsComponent', () => {
  let component: MatTabGroupCardsComponent;
  let fixture: ComponentFixture<MatTabGroupCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTabGroupCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatTabGroupCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
