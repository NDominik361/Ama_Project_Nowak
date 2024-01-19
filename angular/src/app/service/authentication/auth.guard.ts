import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import { Component } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // user not logged in -> redirect to login page
    if (this.authenticationService.getTokenFromLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: {targetUrl: state.url}});
      return false;
    }
  }
}
