import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user = null;
  productsLength: number = 0;
  

  constructor(private authService: AuthService, private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.cartService.cartChange.subscribe(cart => {
      this.productsLength = cart.length;
    });
  }

  logout() {
    this.authService.logout()
    this.route.navigate(['/']);
    this.user = null;
  }






}
