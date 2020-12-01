import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product: IProduct = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.product = this.productsService.getSelected()
  }



}
