import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';

@Injectable()
export class PayUserGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { 
    
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    if(!this.auth.isPayUser())
      this.router.navigate(['/membershipinfo'], { queryParams: { } });
    return this.auth.isPayUser();
  }
}
