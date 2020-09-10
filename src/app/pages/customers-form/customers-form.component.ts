import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import Customer from 'src/app/models/customer.model';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})

export class CustomersFormComponent implements OnInit {
  validated: boolean = false;
  selected = new Customer();
  formClient: FormGroup;

  constructor(private database: DatabaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

    // this.router.events.pipe(
    //   filter(e => e instanceof NavigationStart),
    //   map(() => this.router.getCurrentNavigation().extras.state)
    // ).subscribe(data => {
    //   if(data) {
    //     this.selected = data.selected;
    //   }
    // });

    //  filter(e => e instanceof NavigationStart);
    //  const state = this.router.getCurrentNavigation().extras.state.selected;
    //  if (state.isNew === false) {
    //   this.selected = state;
    //  }

  }

  ngOnInit() {
    // console.log(this.route.data);
    // this.route.data.subscribe(data => console.log(data));
    // this.selected = history.state.selected;

    this.formClient = this.formBuilder.group({
      name: [''],
      phone: [''],
      product: [''],
      plan: [''],
      day: [''],
      type: [''],
      frequency: [''],
      val: ['']
    });

    // this.formClient.patchValue({
    //   name: this.selected.name,
    //   phone: this.selected.phone,
    //   product: this.selected.product,
    //   plan: this.selected.plan,
    //   day: this.selected.day,
    //   type: this.selected.type,
    //   frequency: this.selected.frequency,
    //   val: this.selected.val
    // });

  }

  get f() {return this.formClient.controls};

  back() {
    this.router.navigateByUrl('/customers')
      .then(resolved => {  });
  }

  validate() {
    return true;
  }

  save() {
    // this.database.save(this.selected)
    //   .subscribe(document => this.back, error => console.error(error));
    console.log(this.formClient.value);
  }

  blurPhone() {
    this.selected.phone = this.selected.phone.trim().length < 18 ? '' : this.selected.phone;
  }

  focusPhone() {
    this.selected.phone = this.selected.phone.trim() === '' ? '+55 (' : this.selected.phone;
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
      (e.keyCode < 96 || e.keyCode > 105) || this.selected.phone.length === 19
    ) {
      e.preventDefault();
    }
  }

  mask(e) {
    if(e.keyCode === 13) {
      // this.check();
    } else if(this.selected.phone.length === 7 && e.keyCode !== 8) {
      this.selected.phone += ') ';
    } else if(this.selected.phone.length === 13 && e.keyCode !== 8) {
      this.selected.phone += ' ';
    } else if(this.selected.phone.length === 19 && e.keyCode !== 8) {
      let newPhone = this.selected.phone.replace(/\s/g,'');
      newPhone = newPhone.substring(0, 3) + ' ' + newPhone.substring(3, newPhone.length);
      newPhone = newPhone.substring(0, 8) + ' ' + newPhone.substring(8, newPhone.length);
      newPhone = newPhone.substring(0, 14) + ' ' + newPhone.substring(14, newPhone.length);
      this.selected.phone = newPhone;
    } else if(this.selected.phone.length === 18 && e.keyCode === 8) {
      let newPhone = this.selected.phone.replace(/\s/g,'');
      newPhone = newPhone.substring(0, 3) + ' ' + newPhone.substring(3, newPhone.length);
      newPhone = newPhone.substring(0, 8) + ' ' + newPhone.substring(8, newPhone.length);
      newPhone = newPhone.substring(0, 13) + ' ' + newPhone.substring(13, newPhone.length);
      this.selected.phone = newPhone;
    }
  }
}
