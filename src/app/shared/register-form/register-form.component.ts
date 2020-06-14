import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../models/User';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../styles/forms.components.scss']
})
export class RegisterFormComponent implements OnInit {

  formLogin: FormGroup;

  isPasswordInvalid: boolean = false;
  isUsernameInvalid: boolean = false;
  isPasswordConfirmed: boolean = true;
  isAuthenticated: boolean = false;

  faPencilAlt = faPencilAlt;
  faCheck = faCheck;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm(new User());
  }

  createForm(user: User) {
    this.formLogin = this.formBuilder.group({
      username: [user.username],
      password: [user.password],
      confirmPassword: null
    });
  }

  checkPassword(){
    this.isPasswordConfirmed = this.formLogin.value.password == this.formLogin.value.confirmPassword;
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.apiService.register(this.formLogin.value)
        .subscribe(
          res => {
            this.isAuthenticated = true;
            console.log(res);
          },
          err => {
            console.log(err);
            if (err.error == 'User already exists') {
              this.isUsernameInvalid = true;
            }
          }
        );
    }
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}
