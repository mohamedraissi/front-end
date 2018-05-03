import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbookingComponent } from './navbarbooking.component';

describe('NavbarbookingComponent', () => {
  let component: NavbarbookingComponent;
  let fixture: ComponentFixture<NavbarbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
