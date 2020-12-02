import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products = [];
  totalToPay: number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getCart;
    this.totalToPay= this.products.reduce((acc:number,item)=> +acc + +item.price,0)
  }

}
