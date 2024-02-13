import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeDistribuerComponent } from './cheque-distribuer.component';

describe('ChequeDistribuerComponent', () => {
  let component: ChequeDistribuerComponent;
  let fixture: ComponentFixture<ChequeDistribuerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeDistribuerComponent]
    });
    fixture = TestBed.createComponent(ChequeDistribuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
