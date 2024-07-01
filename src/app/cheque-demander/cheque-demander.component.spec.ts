import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeDemanderComponent } from './cheque-demander.component';

describe('ChequeDemanderComponent', () => {
  let component: ChequeDemanderComponent;
  let fixture: ComponentFixture<ChequeDemanderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeDemanderComponent]
    });
    fixture = TestBed.createComponent(ChequeDemanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
