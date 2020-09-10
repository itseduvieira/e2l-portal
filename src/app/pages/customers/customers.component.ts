import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

import Customer from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  selected: Customer;

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    
  }

  newCustomer() {
    this.router.navigate(['/customers/new'], { state: {
      selected: new Customer()
    } })
    .then(resolved => {  });
  }

  select() {
    let customer = new Customer();
    customer.name = "Eduardo";
    customer.isNew = false;

    this.router.navigate(['/customers/1234'], { state: {
      selected: customer
    } })
    .then(resolved => { });
  }
}
