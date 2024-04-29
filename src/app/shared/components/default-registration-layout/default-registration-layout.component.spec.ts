import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRegistrationLayoutComponent } from './default-registration-layout.component';

describe('DefaultRegistrationLayoutComponent', () => {
  let component: DefaultRegistrationLayoutComponent;
  let fixture: ComponentFixture<DefaultRegistrationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRegistrationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultRegistrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
