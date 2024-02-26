import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeEnvoyerComponent } from './cheque-envoyer.component';

describe('ChequeEnvoyerComponent', () => {
  let component: ChequeEnvoyerComponent;
  let fixture: ComponentFixture<ChequeEnvoyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeEnvoyerComponent]
    });
    fixture = TestBed.createComponent(ChequeEnvoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
