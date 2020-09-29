import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit{
    passwordForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private authService: AuthenticationService) {}

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    get f() { return this.passwordForm.controls }

    onSubmit() {
        this.submitted = true;

        if (this.passwordForm.invalid) {
            return
        }

        this.loading = true;

        this.authService.forgetPassword(this.f.email.value)
            .then(() => {
                this.loading = false;
                this.alertService.success('Se o email existir, haverá um link para redifinição na sua caixa de entrada.', true);

                this.passwordForm.reset();
                this.submitted = false;
            }).catch(err => {
                this.loading = false;
                switch(err.code) {
                    case 'auth/user-not-found': {
                        this.alertService.error("Se o email existir, haverá um link para redifinição na sua caixa de entrada.");
                        console.log(err);
                        this.loading = false;
                        break;
                    } 
                    
                    default: {
                      this.alertService.error("Erro ao realizar o envio do email de recuperação. Tente novamente.");
                      this.loading = false;
                    }
                  }
            })

        
    }
}