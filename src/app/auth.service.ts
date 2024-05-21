import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this._http.post(`https://localhost:7028/api/auth/register`, userData);
  }
  login(userData: any): Observable<any> {
    return this._http.post(`https://localhost:7028/api/auth/login`, userData);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
