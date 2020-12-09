import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products:IProduct[] = [];
  totalToPay: number = 0;

  constructor(private cartService:CartService,private authService:AuthService) { }

  ngOnInit(): void {
    this.cartService.shoppingCart.subscribe(products => {
      this.products = products;
    })
    this.totalToPay= this.products.reduce((acc:number,item)=> +acc + +item.price,0)
  }

  onPurchase() {
    this.authService.addProductsFromCart(this.products);
  }

}
