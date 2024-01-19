import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { environment } from 'src/app/enviornmets/enviornment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { User } from 'src/app/model/User';

import {firstValueFrom} from "rxjs";
import {UserDetail} from "./UserDetail";
import {JwtHelperService} from "@auth0/angular-jwt";

export let KEY_TOKEN = 'token';

  /*
  This is how the token looks after decoded
  {
    "sub": "admin",
    "audience": "web",
    "created": 1663141992580,
    "permissions": null,
    "roles": "ROLE_ADMIN,ROLE_USER",
    "exp": 1663746792
}
   */

export interface Token{
  sub:string;
  audience:string;
  created:number;
  permissions:string;
  roles:string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly AUTH_PATH: string = environment.serverUrlBase + '/auth';
  readonly AUTH_PATH_REFRESH: string = environment.serverUrlBase + '/refresh';
  readonly URL_GET_APP_ROLES: string = environment.serverUrlBase + "/auth/roles"
  public static readonly ROLE_ADMIN = "ADMIN";
  private readonly _keyUserDetail = "userDetail";
  private jwtHelper: JwtHelperService;

  // region Fields

  // endregion

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  private readonly _keyCurrentUser = 'currentUser';

  get currentUser(): User{
    return JSON.parse(localStorage.getItem(this._keyCurrentUser)!);
  }

  set currentUser(user: User) {
    localStorage.setItem(this._keyCurrentUser, JSON.stringify(user));
  }

  login(userName: string, pwd: string): Promise<boolean | undefined> {
    console.log('login', userName, pwd);
    

    const userForAuth = {username: userName, password: pwd};
    const formData = new FormData();
    formData.append('username', 'user');
    formData.append('password', 'password');

    const credentials = `${'user'}:${'password'}`;
    const base64Credentials = btoa(credentials); // Base64 encode the credentials
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64Credentials,
    });
    console.log(headers)
    console.log(base64Credentials)
    console.log(credentials)

    this.http.get('http://localhost:8080/test', { headers });


    
    return this.http.get('http://localhost:8080/test',{headers}).pipe(
      map((response: any): boolean => {
        const token = response && response.token;
        if (token) {
          this.setTokenInLocalStorage(token);
          let userDetail: UserDetail = Object.assign(new UserDetail(), response.user);
          this.setUserDetailInLocalStorage(userDetail);
          return true;
        } else {
          return false;
        }
      })
    ).toPromise();
  }

  fillCurrentUser(): void {
    this.http.get<User>(environment.serverUrl + "/users/user-from-loginname/" + this.getLoggedInUsersLoginname())
      .toPromise()
      .then(u => {
        if (u !== undefined) {
        this.currentUser = u;
        }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  // check if user is authenticated
  isAuthenticated(): boolean {
    const decodedToken:Token|null = this.decodedToken();
    if (decodedToken == null) {
      this.router.navigate(['/']);
    }
    return decodedToken != null;
  }


  refreshToken(): Promise<boolean> {
    return this.http.get(this.AUTH_PATH_REFRESH).toPromise().then((resp: any) => {
      const token = resp && resp.token;
      if (token) {
        localStorage.setItem(KEY_TOKEN, token);
        return true;
      } else {
        return false;
      }
    });
  }

  // endregion


  getLoggedInUsersLoginname(): string {
    // Should not possible, just avoid exception
    const decodedToken:Token|null = this.decodedToken();
    if (!decodedToken) {
      return 'No user!';
    }
    return decodedToken.sub;
  }


  getTokenFromLocalStorage(): string {
    const token = localStorage.getItem(KEY_TOKEN);
    return token ? token : '';
  }

  setTokenInLocalStorage(authToken: string): void {
    if (authToken && authToken.length > 0) {
      localStorage.setItem(KEY_TOKEN, authToken);
    } else {
      localStorage.removeItem(KEY_TOKEN);
    }
  }


  setUserDetailInLocalStorage(userDetail: UserDetail) {
    if (userDetail) {
      localStorage.setItem(this._keyUserDetail, JSON.stringify(userDetail));
    } else {
      localStorage.removeItem(this._keyUserDetail);
    }
  }

  getUserDetailInLocalStorage(): UserDetail {
    const userDetailString = localStorage.getItem(this._keyUserDetail);
    if (userDetailString) {
      return JSON.parse(userDetailString) as UserDetail;
    } else {
      return new UserDetail();
    }
  }

  getTokenExpirationDate(): Date|null {
    return this.jwtHelper.getTokenExpirationDate(this.getTokenFromLocalStorage());
  }

  getUserRoles(): string[] {
    let token = this.decodedToken();
    if (!token) return [];
    return token.roles.split(",");
  }


  isCurrentUserAdmin(): boolean {
    return this.isCurrentUserInRole(AuthenticationService.ROLE_ADMIN);
  }


  isCurrentUserInRole(role: string) {
    return this.getUserRoles().map(r => r.replace("ROLE_", "")).includes(role);
  }

  isCurrentUserAnyRole(roles: string[]) {
    for (const r of roles) {
      let b = this.isCurrentUserInRole(r);
      if (b) {
        return b;
      }
    }
    return false;
  }

  getUserRolesDisplayString(): string {
    let rolesDisplayString = this.getUserDetailInLocalStorage().rolesDisplayString;
    return rolesDisplayString ? rolesDisplayString : "";
  }

  decodedToken():Token|null{
    let tokenFromLocalStorage = this.getTokenFromLocalStorage();
    if (!tokenFromLocalStorage) return null;
    let token:Token|null = this.jwtHelper.decodeToken(tokenFromLocalStorage);
    return token;
  }
}
