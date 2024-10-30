import { TestBed } from '@angular/core/testing';

import { AuthentificServiceService } from './authentific-service.service';

describe('AuthentificServiceService', () => {
  let service: AuthentificServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
