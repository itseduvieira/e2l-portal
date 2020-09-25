import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Customer from '../../models/customer.model';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  selected: Customer;
  users: User[] = [];
  closeResult: string
  loading = true;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private modalService: NgbModal) {}

  open(content, type, modalDimension) {
      if (modalDimension === 'sm' && type === 'modal_mini') {
          this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
              this.closeResult = 'Closed with: $result';
          }, (reason) => {
              this.closeResult = 'Dismissed $this.getDismissReason(reason)';
          });
      } else if (modalDimension === '' && type === 'Notification') {
        this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
      } else {
          this.modalService.open(content,{ centered: true }).result.then((result) => {
              this.closeResult = 'Closed with: $result';
          }, (reason) => {
              this.closeResult = 'Dismissed $this.getDismissReason(reason)';
          });
      }
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }
  }

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

  deleteUser(uid) {
    this.userService.deleteUser(uid)
    .pipe(first())
        .subscribe(() => {
          this.alertService.success("Usuário excluído com sucesso.");
          this.getAllUsers();
        }, err => {
          this.alertService.error(err);
        });
  }
}
