import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root'})
export class AuthRoleGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isCurrentUserAnyRole(route.data['roles'])) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: {targetUrl: state.url}});
      //this.messageService.createErrorMessage("Zugriff verweigert. Sie haben nicht die notwendige Rolle.")
      return false;
    }
  }
}
