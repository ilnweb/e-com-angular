import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit, OnDestroy {
  product: IProduct = null;
  user = null;
  private activatedSub: Subscription;

  constructor(private productsService: ProductsService, private authService: AuthService) { }

  ngOnInit() {
    this.activatedSub=this.authService.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
    
    this.product = this.productsService.getSelected()
   
  }

  ngOnDestroy():void {
    this.activatedSub.unsubscribe()
  }
}
