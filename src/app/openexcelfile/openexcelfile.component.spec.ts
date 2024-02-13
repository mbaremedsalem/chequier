import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenexcelfileComponent } from './openexcelfile.component';

describe('OpenexcelfileComponent', () => {
  let component: OpenexcelfileComponent;
  let fixture: ComponentFixture<OpenexcelfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenexcelfileComponent]
    });
    fixture = TestBed.createComponent(OpenexcelfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
