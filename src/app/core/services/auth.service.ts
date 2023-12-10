import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userJson: any = "";
  userRole: string = "";
  userId: number = 0;
  user: User = new User();
firstTime: boolean = false;

  constructor(private cookieService: CookieService) {

  }
changeFirstTime(){
  this.firstTime = true;
}
getFirstTime(){
  return this.firstTime;
}

  public getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  public setAuthorizationToken(AuthorizationToken: string): void {
    localStorage.setItem('token', AuthorizationToken);
  }

  public isAuthenticated(): boolean {
    return this.getAuthorizationToken() ? true : false;
  }

  public setUserStorage(user: User): void {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public getUserRole(): string {
    this.userJson = this.getUserStorage();

    if (this.userJson == null) return "";

    let res = JSON.parse(this.userJson);

    this.userRole = res.role[0];
    return this.userRole;
  }

  public getUserIdLocal(): number {
    this.userJson = this.getUserStorage();

    let res = JSON.parse(this.userJson);
    this.userId = res.user.id;

    return res.user.id;
  }

  public getUserNameLocal(): string {
    this.userJson = this.getUserStorage();

    if (this.userJson == null) {
      return "";
    }

    let res = JSON.parse(this.userJson);
    return res.user.userName;
  }

  public getProfileImageLocal(): string {
    this.userJson = this.getUserStorage();

    if (this.userJson == null) {
      return "";
    }

    let res = JSON.parse(this.userJson);
    return res.user.profileImageUrl;
  }

  public getEmailLocal(): string {
    this.userJson = this.getUserStorage();
    if (this.userJson == null) {
      return "";
    }

    let res = JSON.parse(this.userJson);
    return res.user.email;
  }

  public setPreferedLanguage(): string {
    this.userJson = this.getUserStorage();
    if (this.userJson != null) {
      let res = JSON.parse(this.userJson);

      let preferedLanguage = res.user.preferedLanguage;

      if (preferedLanguage != null) {
        localStorage.setItem("language", preferedLanguage);

        return preferedLanguage;
      } else {
        return "En-US";
      }
    } else {
      return "En-US";
    }
  }

  public getUserEnabledLocal(): boolean {
    this.userJson = this.getUserStorage();
    let res = JSON.parse(this.userJson);

    return res.user.isEnabled;
  }

  public getUserInfo() {
    this.userJson = this.getUserStorage();

    if (this.userJson) {
      return this.userJson;
    }
    return null;
  }
   

  public resetCredentials(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('rememberCurrentUser');
    localStorage.setItem("language", "en-US");

    this.cookieService.delete('googleCredential');
  }

  private getUserStorage() {
    return localStorage.getItem('language');
  }
}
