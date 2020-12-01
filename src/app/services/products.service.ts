import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsChanged = new Subject<IProduct[]>();
  private products: IProduct[] = [];

  constructor(private http: HttpClient, private authservice: AuthService) { }

  getLocalProducts() {
    return this.products;
  }

  getAllProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products = [...res.products]
      this.productsChanged.next(this.products);
      console.log(this.products);
    })
  }

  getLatestProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products = [...res.products]
      this.productsChanged.next(this.products.reverse().splice(0, 3));
      console.log(this.products);
    })
  }

  createProduct(title: string, category: string, imageUrl: string, description: string, price: number) {
    const token = localStorage.getItem('token')
    if (token) {
      return this.http.post('http://localhost:5000/shop/create-product', {
        title,
        category,
        imageUrl,
        description,
        price,
      }, {
        headers: {
          Authorization: "Bearer " + 'dasdad',
        },
      })
    }
  }
}
