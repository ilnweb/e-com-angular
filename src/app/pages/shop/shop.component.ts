import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[] = []
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const category = this.route.snapshot.params['category'];
    if (category !== 'all-products') {
      this.productsService.getFiltered(category).subscribe((res: any) => {
        this.products = res.products;
      });
    }
    else{
    this.productsService.getAllProducts();
    this.productsService.products.subscribe((products: IProduct[]) => {
      this.products = products;
    })
      console.log(this.products);
    }
  }

}
