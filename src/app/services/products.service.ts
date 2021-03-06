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

  constructor(private http: HttpClient, private authservice: AuthService, private route: Router) { }

  getAllProducts() {
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products.next(res.products);
      
    })
  }

  getLatestProducts() {
    return this.http.get('http://localhost:5000/shop/products').subscribe((res: any) => {
      this.products.next(res.products.reverse().splice(0, 4));
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
      }).subscribe((resData:any) => {
        if (resData) {
          console.log(resData);
          const user = resData.user;
          this.authservice.user.next(user)
          this.route.navigate(['/profile'])
        }
      })
    }
  }

  selectProduct(product: IProduct) {
    const prod = product;
    this.selectedProduct = prod;
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

  getSingleProduct(id: string) {
    console.log(id);
    return this.http.post('http://localhost:5000/shop/single-product', {
      id
    })
  }

 

}
