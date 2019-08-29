import { TestBed } from '@angular/core/testing';

import { SecretaryOfStatePdfService } from './secretary-of-state-pdf.service';

describe('SecretaryOfStatePdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretaryOfStatePdfService = TestBed.get(SecretaryOfStatePdfService);
    expect(service).toBeTruthy();
  });
});
