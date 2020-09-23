import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

import Customer from '../../models/customer.model';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  selected: Customer;
  users: User[] = [];
  loading = true;

  constructor(private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(first())
        .subscribe(users => {
          this.users = users;

          this.loading = false;
          console.log(this.users)
        });
  }

  newCustomer() {
    this.router.navigate(['/customers/new'])
    .then(resolved => {  });
  }
}
