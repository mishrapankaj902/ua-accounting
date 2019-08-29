import { TestBed } from '@angular/core/testing';

import { BookkeepingTaxesPdfService } from './bookkeeping-taxes-pdf.service';

describe('BookkeepingTaxesPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookkeepingTaxesPdfService = TestBed.get(BookkeepingTaxesPdfService);
    expect(service).toBeTruthy();
  });
});
