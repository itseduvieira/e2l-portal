import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  fieldTextType: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();
  }

  get f() { return this.loginForm.controls; }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return
    }

    this.loading = true; 

    this.authenticationService.login(this.f.email.value, this.f.password.value)
    .then(() => {
            this.router.navigate(['/dashboard']);
    }).catch(err => {
      switch(err.code) {
        case 'auth/user-not-found': {
            this.alertService.error("Usuário e/ou senha incorretos.");
            this.loading = false;
            break;
        }
        case 'auth/wrong-password': {
            this.alertService.error("Usuário e/ou senha incorretos.");
            this.loading = false;
            break;
        }
        case 'auth/invalid-user-token': {
          this.alertService.error("Sua sessão expirou. Efetue o login novamente.");
          this.loading = false;
          break;
      }
          default: {
            this.alertService.error("Erro ao realizar o login do usuário. Tente novamente.");
            this.loading = false;
        }
      }
    }) // END CATCH
  }
}
