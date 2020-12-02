import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = null;

  constructor(private authService: AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password)
    // this.authService.user.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     this.route.navigate(['/'])
    //   }
    // })
    this.user = this.authService.userGet;
  }

}
