import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'e-com-angular';

  constructor(private authService: AuthService,private productsService: ProductsService) { }

  ngOnInit() {
    this.authService.autoLogin()
    this.productsService.getAllProducts()
  }
}
