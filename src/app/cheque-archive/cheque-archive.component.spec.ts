import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeArchiveComponent } from './cheque-archive.component';

describe('ChequeArchiveComponent', () => {
  let component: ChequeArchiveComponent;
  let fixture: ComponentFixture<ChequeArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequeArchiveComponent]
    });
    fixture = TestBed.createComponent(ChequeArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
