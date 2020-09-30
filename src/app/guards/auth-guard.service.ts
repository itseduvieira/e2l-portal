import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  user = new User();
  role: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
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

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        
        if (currentUser.customClaims.admin) {
          this.role = 'admin';
        } else {
          this.role = currentUser.customClaims;
        }

        if (route.data.roles && route.data.roles.indexOf(this.role) === -1) {
            
            this.router.navigate(['/dashboard']);
            return false;
        }

        return true;
    }
    return false;
  }

}