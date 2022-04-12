import { TestBed } from '@angular/core/testing';

import { RegFormServiceService } from './reg-form-service.service';

describe('RegFormServiceService', () => {
  let service: RegFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
