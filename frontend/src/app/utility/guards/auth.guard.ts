import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.authenticated$.value?.access_token) {
      return true;
    } else {
      this.authService.redirectUrl = route.url.map(segment => segment.path).join('/');;
      this.authService.queryParams = route.queryParams;
      this.router.navigate(['/login']);
      return false;
    }
  }

};
