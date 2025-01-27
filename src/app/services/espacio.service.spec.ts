import { TestBed } from '@angular/core/testing';

import { EspacioService } from './espacio.service';

describe('EspacioService', () => {
  let service: EspacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
