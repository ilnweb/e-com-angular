import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: IUser = null;
  private activeSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.activeSubscription = this.authService.user.subscribe((user: IUser) => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.activeSubscription.unsubscribe()
  }

}
