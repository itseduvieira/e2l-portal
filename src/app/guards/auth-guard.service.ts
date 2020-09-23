import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { User } from './../models/user.model';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  user = new User();

  constructor(private authService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.userData.pipe(map(auth => {
      if (auth) {
        this.user.displayName = auth.displayName;
        this.user.email = auth.email;
        this.user.uid = auth.uid;
        this.user.phoneNumber = auth.phoneNumber;

        localStorage.setItem('currentUser', JSON.stringify(this.user));
        
        return true;
      } else {
        this.router.navigate(['/login']);

        return false;
      }
    }));
  }
}