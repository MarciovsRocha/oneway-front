import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAutenticateLayoutComponent } from './default-autenticate-layout.component';

describe('DefaultAutenticateLayoutComponent', () => {
  let component: DefaultAutenticateLayoutComponent;
  let fixture: ComponentFixture<DefaultAutenticateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultAutenticateLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultAutenticateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
