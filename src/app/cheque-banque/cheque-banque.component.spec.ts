import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeBanqueComponent } from './cheque-banque.component';

describe('ChequeBanqueComponent', () => {
  let component: ChequeBanqueComponent;
  let fixture: ComponentFixture<ChequeBanqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeBanqueComponent]
    });
    fixture = TestBed.createComponent(ChequeBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
