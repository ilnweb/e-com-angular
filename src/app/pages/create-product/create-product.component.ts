import {Router} from "@angular/router"
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private route:Router) { }

  ngOnInit(): void {
  }

  onCreateProduct(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { title,category, imageUrl, description, price } = form.value;
    this.productsService.createProduct(
      title,category, imageUrl, description, price
    ).subscribe(resData => {
      if (resData) {
        this.route.navigate(['/'])
      }
    })
  }

}
