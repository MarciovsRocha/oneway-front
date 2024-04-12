import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotativeCardComponent } from './rotative-card.component';

describe('RotativeCardComponent', () => {
  let component: RotativeCardComponent;
  let fixture: ComponentFixture<RotativeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotativeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotativeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
