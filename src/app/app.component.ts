import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class AppComponent implements OnInit {
  title = 'e-com-angular';

  constructor(private authService: AuthService, private productsService: ProductsService, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.authService.autoLogin()
    this.productsService.getAllProducts()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 200) {
       let element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      let element = document.getElementById('navbar');
        element.classList.remove('sticky'); 
     }
  }
}
