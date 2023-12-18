import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = '';
  private _username!: string;
  constructor(private router: Router) {
    this.token = localStorage.getItem('Token');
    const storedUsername = localStorage.getItem('Username');
    this._username = JSON.parse(storedUsername!);
  }
  logout(): void {
    this.setToken(null);
    localStorage.setItem('Username', JSON.stringify(null));
    this.router.navigate(['login']);
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
    localStorage.setItem('Token', this.token!);
  }
  getToken(): string {
    return this.token!;
  }
  isAuthenticated(): boolean {
    if (this.token?.length! > 0) {
      return true;
    }
    return false;
  }
}
