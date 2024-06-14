import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRegistrationComponent } from './location-registration.component';

describe('LocationRegistrationComponent', () => {
  let component: LocationRegistrationComponent;
  let fixture: ComponentFixture<LocationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
