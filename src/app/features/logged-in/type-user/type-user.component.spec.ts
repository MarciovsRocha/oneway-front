import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUserComponent } from './type-user.component';

describe('TypeUserComponent', () => {
  let component: TypeUserComponent;
  let fixture: ComponentFixture<TypeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
