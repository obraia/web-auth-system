import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { User } from '../models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../forms.component.scss']
})
export class LoginFormComponent implements OnInit {

  formLogin: FormGroup;

  isPasswordInvalid: boolean = false;
  isUsernameInvalid: boolean = false;
  isAuthenticated: boolean = false;

  faUser = faUser;
  faCheck = faCheck;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(new User());
  }

  createForm(user: User) {
    this.formLogin = this.formBuilder.group({
      username: [user.username],
      password: [user.password],
      rememberMe: [user.rememberMe]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.apiService.login(this.formLogin.value)
        .subscribe(
          res => this.isAuthenticated = true,
          err => {
            if (err.error == 'Incorrect password') {
              this.isPasswordInvalid = true;
            } else if (err.error == 'User not found') {
              this.isUsernameInvalid = true;
            }
          }
        )
    } else {
      console.log('O formulário não foi preenchido de forma válida');
    }
  }
}
