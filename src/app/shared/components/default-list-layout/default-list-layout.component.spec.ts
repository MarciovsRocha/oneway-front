import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultListLayoutComponent } from './default-list-layout.component';

describe('DefaultListLayoutComponent', () => {
  let component: DefaultListLayoutComponent;
  let fixture: ComponentFixture<DefaultListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultListLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
