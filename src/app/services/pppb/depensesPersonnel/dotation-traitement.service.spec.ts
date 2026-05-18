import { TestBed } from '@angular/core/testing';

import { DotationTraitementService } from './dotation-traitement.service';

describe('DotationTraitementService', () => {
  let service: DotationTraitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotationTraitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
