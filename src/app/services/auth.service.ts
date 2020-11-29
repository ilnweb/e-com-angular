import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  productsChanged = new Subject<IUser[]>();
  private user: IUser = null;

  constructor(private http: HttpClient) { }

  register(email: string, password: string, displayName: string) {
    return this.http.post('http://localhost:5000/auth/register', {
      email,
      displayName,
      password

    }).subscribe((res: any) => {
      
    })
  }
}
