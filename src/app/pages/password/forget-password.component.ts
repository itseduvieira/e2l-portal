import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

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
        private alertService: AlertService) {}

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

        this.alertService.success('Email enviado com sucesso', true);
    }
}