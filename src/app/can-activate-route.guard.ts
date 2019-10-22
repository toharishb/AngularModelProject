import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private routerService: RouterService,
    private authService: AuthenticationService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const bearerToken = localStorage.getItem('bearerToken');
    if (bearerToken != null) {
      const authStatus = this.authService.isUserAuthenticated(bearerToken)
        .then((abc) => {
          return abc;
        }, err => {
          console.log(err);
        });

      if (authStatus) {
        return true;
      }
    } else {
      this.routerService.routeToLogin();
      return false;
    }


  }
}
