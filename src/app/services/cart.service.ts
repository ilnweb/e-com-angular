import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProduct } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChange = new Subject<IProduct[]>();
  cart: IProduct[] = [];


  get getCart() {
    return this.cart;
  }

  addTocart(product:IProduct) {
    this.cart = [
      ...this.cart,
      product
    ]
    this.cartChange.next(this.cart)
    console.log(this.cart);
  }
  
}