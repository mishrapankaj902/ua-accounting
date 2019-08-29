import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesLetterPdfComponent } from './taxes-letter-pdf.component';

describe('TaxesLetterPdfComponent', () => {
  let component: TaxesLetterPdfComponent;
  let fixture: ComponentFixture<TaxesLetterPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesLetterPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesLetterPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
