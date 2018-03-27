import { TestBed, async, inject } from '@angular/core/testing';

import { IsregisteruserGuard } from './isregisteruser.guard';

describe('IsregisteruserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsregisteruserGuard]
    });
  });

  it('should ...', inject([IsregisteruserGuard], (guard: IsregisteruserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
