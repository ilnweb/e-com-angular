import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user = null;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => { 
      this.user = user;
    })
  }

  logout() {
    this.authService.logout()
    this.route.navigate(['/']);
    this.user = null;
  }

}
