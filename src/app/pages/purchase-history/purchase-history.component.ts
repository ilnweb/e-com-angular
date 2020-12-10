import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  products: IProduct[] = null;
  private activeSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.activeSubscription = this.authService.user.subscribe((user: IUser) => {
      if (user) {
        this.products = user.purchased;
      }
    })
  }

  ngOnDestroy() {
    this.activeSubscription.unsubscribe()
  }
}
