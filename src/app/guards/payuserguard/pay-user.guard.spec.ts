import { TestBed, async, inject } from '@angular/core/testing';

import { PayUserGuard } from './pay-user.guard';

describe('PayUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayUserGuard]
    });
  });

  it('should ...', inject([PayUserGuard], (guard: PayUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
