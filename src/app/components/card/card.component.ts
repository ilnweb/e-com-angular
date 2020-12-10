import { ViewFlags } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../models/product.model';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: IProduct;
  @Input() displayButton?:boolean=true;
  @Input() user: IUser = null;
  
  constructor(private productsService: ProductsService, private authService: AuthService,private cartService:CartService) { }

  ngOnInit() {
    this.authService.user.subscribe((user: IUser) => {
      if (user) {
        this.user = user;
      }
     
    })
  }

  selectProduct(product:IProduct) {
    this.productsService.selectProduct(product);
  }

  addToCart(product:IProduct) {
    this.cartService.addTocart(product)
  }

  deleteProduct(productId:string) {
    console.log(productId);
    this.authService.deleteProduct(productId)
  }

}
