import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsChanged = new Subject<IProduct[]>();
  private products:IProduct[] = [{
    productTitle: 'sdasdd',
    productImg: 'dsadsadsa',
    productDescription: "sdsad",
    productPrice: 23423423
  }];

  constructor(private http: HttpClient) { }

  getLocalProducts() {
    return this.products;
  }

  getAllProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res:any) => {
      this.products = [...res.products]
      this.productsChanged.next(this.products);
      console.log(this.products);
    })
  }

  getLatestProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res:any) => {
      this.products = [...res.products]
      this.productsChanged.next(this.products.reverse().splice(0,4));
      console.log(this.products);
    })
  }

  createProduct(title: string, imageUrl: string, descriptiion: string, price: number) {
    console.log('reached');
    return this.http.post('http://localhost:5000/shop/create-product', {
      productTitle: title,
      productImg: imageUrl,
      productDescription:descriptiion,
      productPrice: price,
      userId: 'daddadadadads'
    })
  }
}
