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
  shoppingCart = new BehaviorSubject<IProduct[]>([]);

  addTocart(product:IProduct) {
    const cart = [
      ...this.shoppingCart.value,
      product
    ]
    this.shoppingCart.next(cart)
    console.log(cart);
  }
  
}