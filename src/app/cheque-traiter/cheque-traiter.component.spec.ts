import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeTraiterComponent } from './cheque-traiter.component';

describe('ChequeTraiterComponent', () => {
  let component: ChequeTraiterComponent;
  let fixture: ComponentFixture<ChequeTraiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeTraiterComponent]
    });
    fixture = TestBed.createComponent(ChequeTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
