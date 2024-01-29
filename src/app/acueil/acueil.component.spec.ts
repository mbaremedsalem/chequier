import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcueilComponent } from './acueil.component';

describe('AcueilComponent', () => {
  let component: AcueilComponent;
  let fixture: ComponentFixture<AcueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcueilComponent]
    });
    fixture = TestBed.createComponent(AcueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
