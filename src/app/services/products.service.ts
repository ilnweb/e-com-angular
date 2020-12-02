import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IProduct } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products = new Subject<IProduct[]>();
  selectedProduct = null;

  constructor(private http: HttpClient, private authservice: AuthService,private route:Router) { }

  getLocalProducts() {
    return this.products;
  }

  getAllProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products.next(res.products);
      
    })
  }

  getLatestProducts() {
    console.log('reached');
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products.next(res.products.reverse().splice(0, 3));
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
          Authorization: "Bearer " + token,
        },
      })
    }
  }

  selectProduct(product: IProduct) {
    const prod = product;
    this.selectedProduct= prod;
    this.route.navigate([`/single-product/${product._id}`])
  }

  getSelected() {
    return this.selectedProduct;
  }

  getFiltered(category: string) {
    console.log(category);
    return this.http.post('http://localhost:5000/shop/filtered-products', {
      category
    })
  }


}
