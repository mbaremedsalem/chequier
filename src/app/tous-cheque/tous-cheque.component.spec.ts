import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousChequeComponent } from './tous-cheque.component';

describe('TousChequeComponent', () => {
  let component: TousChequeComponent;
  let fixture: ComponentFixture<TousChequeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TousChequeComponent]
    });
    fixture = TestBed.createComponent(TousChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
