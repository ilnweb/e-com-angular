import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit, OnDestroy {
  product: IProduct = null;
  user = null;
  private activatedSub: Subscription;

  constructor(private productsService: ProductsService, private authService: AuthService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.activatedSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })
    const id = this.route.snapshot.params['id'];
    this.product = this.productsService.getSelected()
    if (!this.product) {
      this.productsService.getSingleProduct(id).subscribe((res: any) => {
        this.product = res.product;
        console.log(this.product);
      })
    }
  }

  addToCart(product:IProduct) {
    this.cartService.addTocart(product)
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe()
  }
}
