import { TestBed } from '@angular/core/testing';

import { FinancialFormService } from './financial-form.service';

describe('FinancialFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinancialFormService = TestBed.get(FinancialFormService);
    expect(service).toBeTruthy();
  });
});
