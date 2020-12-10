import { Router } from "@angular/router"
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  selectedCategory = null;
  noCathegory=false

  constructor(private productsService: ProductsService, private route: Router) { }

  ngOnInit(): void {
  }
  
  onCreateProduct(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { title, imageUrl, description, price } = form.value;

    if (!this.selectedCategory) {
      this.noCathegory = true
      console.log(this.noCathegory);
      return
    }
    

    this.productsService.createProduct(
      title, this.selectedCategory, imageUrl, description, price
    )
  }

}
