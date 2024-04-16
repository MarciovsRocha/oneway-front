import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCartComponent } from './travel-cart.component';

describe('TravelCartComponent', () => {
  let component: TravelCartComponent;
  let fixture: ComponentFixture<TravelCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
