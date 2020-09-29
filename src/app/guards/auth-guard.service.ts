import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  user = new User();
  // u: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.userData.pipe(
      map(auth => auth),
      mergeMap(auth => {
        if(auth) {
          return this.userService.getUserByUid(auth.uid);
        } else {
          throw new Error();
        }
      }),
      map(res => {
        this.user.displayName = res.displayName;
        this.user.email = res.email;
        this.user.uid = res.uid;
        this.user.phoneNumber = res.phoneNumber;
        this.user.customClaims = res.customClaims;
        
        localStorage.setItem('currentUser', JSON.stringify(this.user));

        return true;
      }),
      catchError(error => {
        this.router.navigate(['/login']);

        return of(false);
      }));
  }
}