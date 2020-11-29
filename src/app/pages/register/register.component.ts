import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordMatch = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const { email, name, password, confirmPassword } = form.value;

    if (confirmPassword !== password) {
      this.passwordMatch = true;
      return;
    }
    this.authService.register(email, password, name)
  }

}
