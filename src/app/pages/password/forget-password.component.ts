import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

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
        private userService: UserService) {}

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

        this.userService.resetPassword(this.f.email.value)
            .pipe(first())
                .subscribe(() => {
                    this.loading = false;
                    this.alertService.success('Se o email existir, haverá um link para redifinição na sua caixa de entrada.', true);

                    this.passwordForm.reset();
                    this.submitted = false;
                }, err => {
                    this.loading = false;
                    this.alertService.error(err);
                })

        
    }
}