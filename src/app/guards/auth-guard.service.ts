import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

import { User } from './../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AdminLayoutRoutes } from '../layouts/admin-layout/admin-layout.routing';
import { element } from 'protractor';

@Injectable()
export class AuthGuard implements CanActivate {
  user = new User();
  u: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.userData.pipe(map(auth => {
      if (auth) {
        this.userService.getUserByUid(auth.uid)
          .pipe(first())
            .subscribe(res => {
              this.u = res;
              this.user.displayName = this.u.displayName;
              this.user.email = this.u.email;
              this.user.uid = this.u.uid;
              this.user.phoneNumber = this.u.phoneNumber;
              this.user.customClaims = this.u.customClaims;
              
              localStorage.setItem('currentUser', JSON.stringify(this.user));
            })

        return true;
      } else {
        this.router.navigate(['/login']);

        return false;
      }
    }));
  }
}