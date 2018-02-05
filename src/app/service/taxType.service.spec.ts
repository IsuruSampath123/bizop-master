/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaxTypeService } from './taxType.service';

describe('Service: TaxType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxTypeService]
    });
  });

  it('should ...', inject([TaxTypeService], (service: TaxTypeService) => {
    expect(service).toBeTruthy();
  }));
});