import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable()
export class IsregisteruserGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { 
    
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser = this.auth.getCurrentUser();     

    if(currentUser.isAnonymous)
      this.router.navigate(['/register'], { queryParams: { } });
    return !currentUser.isAnonymous;
  }
}
