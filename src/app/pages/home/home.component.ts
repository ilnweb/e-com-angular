import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:IProduct[] = []
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getLatestProducts();
    this.productsService.products.subscribe((products:IProduct[]) => {
      this.products = products;
    })
    console.log(this.products);
  }
}
