import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from '../models/user.model';
import { Auth } from '../models/auth.model';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`
  private user = new BehaviorSubject<User| null>(null);
  user$ = this.user.asObservable();
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap((response) => this.tokenService.saveToken(response.access_token)),
      switchMap(() => this.profile()),
      tap((user) => this.user.next(user))
    )
  }

  profile() {
    const headers = new HttpHeaders(/* { 'Authorization': `Bearer ${token}` } */);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers
    })
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
