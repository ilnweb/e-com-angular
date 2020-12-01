import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: IProduct;
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  selectProduct(product:IProduct) {
    this.productsService.selectProduct(product);
  }

}
