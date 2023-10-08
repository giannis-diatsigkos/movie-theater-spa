import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private _username!: string;
  constructor(private router: Router) {
    const storedToken = localStorage.getItem('Token');
    this.token = JSON.parse(storedToken!);
    const storedUsername = localStorage.getItem('Username');
    this._username = JSON.parse(storedUsername!);
  }
  logout(): void {
    this.setToken(null);
    this._username = '';
    this.router.navigate(['']);
  }
  setDecodedAccessToken(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this._username = JSON.parse(jsonPayload).unique_name;
    this.isAuthenticated();
    localStorage.setItem('Username', JSON.stringify(this._username));
  }

  getDecodedAccessToken() {
    return this._username;
  }

  setToken(token: any) {
    this.token = token;
    localStorage.setItem('Token', JSON.stringify(this.token));
  }
  getToken(): string {
    return this.token;
  }
  isAuthenticated(): boolean {
    if (this._username) {
      return true;
    }
    return false;
  }
}
