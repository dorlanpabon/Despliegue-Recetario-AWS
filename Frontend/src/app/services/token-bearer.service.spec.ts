import { TestBed } from '@angular/core/testing';

import { TokenBearerService } from './token-bearer.service';

describe('TokenBearerService', () => {
  let service: TokenBearerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenBearerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
