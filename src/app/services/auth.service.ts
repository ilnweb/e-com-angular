import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<IUser>(null);
  // user: IUser = null;
  readonly user$ = this.user.asObservable();
  constructor(private http: HttpClient) { }

  get userGet(): IUser {
    return this.user.getValue();
  }

  register(email: string, password: string, displayName: string) {
    return this.http.post('http://localhost:5000/auth/register', {
      email,
      displayName,
      password

    }).subscribe((res: any) => {
      const user = res.user;
      this.user.next(user);
      console.log(this.user);
    })
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:5000/auth/login', {
      email,
      password

    }).subscribe((res: any) => {
      const user = res.user;
      this.user.next(user);
      console.log(this.user);
      localStorage.setItem('token', user._token)
    })
  }

  autoLogin() {
    const token = localStorage.getItem('token')
    if (token) {
      return this.http.post('http://localhost:5000/auth/login-auto', {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).subscribe((res: any) => {
          const user = res.user;
          this.user.next(user);
          console.log(user);
        })
    }

  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

}
