import { TestBed, inject } from '@angular/core/testing';

import { UserAuthenticationService } from './user-authentication.service';

describe('UserAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthenticationService]
    });
  });

  it('should ...', inject([UserAuthenticationService], (service: UserAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
