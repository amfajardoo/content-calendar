import { TestBed } from '@angular/core/testing';

import { TokenManager } from './token-manager';

describe('TokenManager', () => {
  let service: TokenManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
