import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})

export class CustomersFormComponent implements OnInit {
  formClient: FormGroup;
  user = new User();
  loading = false;
  submitted = false;
  phoneMask = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.formClient = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null],
      email: [null, [Validators.required, Validators.email]],
      levelAccess: [null, Validators.required],
      // dateBirthday: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    });

    // this.setBirthdayValidator();
  }

  // setBirthdayValidator() {
  //   const role = this.formClient.get('levelAccess');
  //   const dateBirthday = this.formClient.get('dateBirthday');

  //   role.valueChanges
  //     .subscribe(r => {
  //       if (r === 'admin' || r === 'school') {
          
  //         dateBirthday.setValidators(null);
  //       } else {
  //         dateBirthday.setValidators([Validators.required]);
  //       }

  //       dateBirthday.updateValueAndValidity();
  //     });

  // }

  get f() {return this.formClient.controls};

  onSubmit() {
    this.submitted = true;

    if (this.f.password.value !== this.f.confirmPassword.value) {
        this.alertService.error('As senhas precisam ser iguais.');
        return;
    }

    if (this.formClient.invalid) {
      return
    }

    this.user.displayName = this.f.name.value;
    this.user.email = this.f.email.value;
    this.user.phoneNumber = this.f.phone.value.replace(/[() ]/g, '');
    this.user.customClaims = this.f.levelAccess.value;
    this.user.password = this.f.password.value;
    // this.user.dateBirthday = this.f.dateBirthday.value;

    this.loading = true;

    this.userService.createUser(this.user)
      .pipe()
        .subscribe(() => {
          this.submitted = false;
          this.formClient.reset();
          
          this.loading = false;

          this.alertService.success('Usuário cadastrado com sucesso.', true);
        }, err => {
          switch(err.code) {
            case 'auth/email-already-exists': {
                this.alertService.error("Esse email já está cadastrado.");
                this.loading = false;
                console.log(err);
                break;
            } 
            case 'auth/phone-number-already-exists': {
                this.alertService.error("Esse telefone já está cadastrado.");
                this.loading = false;
                console.log(err);
                break;
            } 
            
            default: {
              this.alertService.error("Erro ao realizar o cadastro do usuário. Tente novamente.");
              this.loading = false;
            }
          }
        })
  }

  back() {
    this.router.navigateByUrl('/customers')
      .then(resolved => {  });
  }

  blurPhone() {
    this.phoneMask = this.phoneMask.trim().length < 18 ? '' : this.phoneMask;
  }

  focusPhone() {
    this.phoneMask = this.phoneMask.trim() === '' ? '+55 (' : this.phoneMask;
  }

  digitOnly(e) {
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105) || this.phoneMask.length === 19
    ) {
      e.preventDefault();
    }
  }

  mask(e) {
    if(e.keyCode === 13) {
      // this.check();
    } else if(this.phoneMask.length === 7 && e.keyCode !== 8) {
      this.phoneMask += ') ';
    } else if(this.phoneMask.length === 13 && e.keyCode !== 8) {
      this.phoneMask += ' ';
    } else if(this.phoneMask.length === 19 && e.keyCode !== 8) {
      let newPhone = this.phoneMask.replace(/\s/g,'');
      newPhone = newPhone.substring(0, 3) + ' ' + newPhone.substring(3, newPhone.length);
      newPhone = newPhone.substring(0, 8) + ' ' + newPhone.substring(8, newPhone.length);
      newPhone = newPhone.substring(0, 14) + ' ' + newPhone.substring(14, newPhone.length);
      this.phoneMask = newPhone;
    } else if(this.phoneMask.length === 18 && e.keyCode === 8) {
      let newPhone = this.phoneMask.replace(/\s/g,'');
      newPhone = newPhone.substring(0, 3) + ' ' + newPhone.substring(3, newPhone.length);
      newPhone = newPhone.substring(0, 8) + ' ' + newPhone.substring(8, newPhone.length);
      newPhone = newPhone.substring(0, 13) + ' ' + newPhone.substring(13, newPhone.length);
      this.phoneMask = newPhone;
    }
  }
}
