import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

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
