import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenallchequeComponent } from './openallcheque.component';

describe('OpenallchequeComponent', () => {
  let component: OpenallchequeComponent;
  let fixture: ComponentFixture<OpenallchequeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenallchequeComponent]
    });
    fixture = TestBed.createComponent(OpenallchequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
