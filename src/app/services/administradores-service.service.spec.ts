import { TestBed } from '@angular/core/testing';

import { AdministradoresServiceService } from './administradores-service.service';

describe('AdministradoresServiceService', () => {
  let service: AdministradoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
