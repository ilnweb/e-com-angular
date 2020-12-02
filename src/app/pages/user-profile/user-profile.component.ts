import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user:IUser = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user:IUser) => {
      this.user = user;
    })
  }

}
