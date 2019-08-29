import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialFormComponent } from './financial-form.component';

describe('FinancialFormComponent', () => {
  let component: FinancialFormComponent;
  let fixture: ComponentFixture<FinancialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
