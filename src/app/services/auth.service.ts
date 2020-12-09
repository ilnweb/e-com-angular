import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<IUser>(null);
  // user: IUser = null;
  readonly user$ = this.user.asObservable();
  constructor(private http: HttpClient, private route: Router,private cartService: CartService) { }

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
      this.route.navigate(['/'])
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
      this.route.navigate(['/'])
    })
  }

  async autoLogin() {
    const token = localStorage.getItem('token')
    if (token) {
      const res:any = await this.http.post('http://localhost:5000/auth/login-auto', {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).toPromise()
        const user:IUser = res.user;
        this.user.next(user);
        console.log(res);
    }

  }

  logout() {
    localStorage.removeItem('token');
    this.user.next(null);
  }

  addProductsFromCart(products: IProduct[]) {
    console.log(products);
    const token = localStorage.getItem('token')
    if (token) {
      return this.http.post('http://localhost:5000/user/add-purchised', {
        products
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).subscribe((res: any) => {
        const user:IUser = res.user;
        this.user.next(user);
        console.log(user);
        this.route.navigate(['/profile'])
        this.cartService.shoppingCart.next([]);
        
      })
    }
  }

}
