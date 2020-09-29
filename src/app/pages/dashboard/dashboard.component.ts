import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  closeResult: string;
  currentUser: User;
  user: User;
  users: any;
  totalAdmin = 0;
  totalStudent = 0;
  totalSchool = 0;
  totalParent = 0;

  constructor(private userService: UserService,
              private modalService: NgbModal) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.user = this.currentUser;

    this.loadAllUsers();
  }

  openXl(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  loadAllUsers() {
    this.userService.getAllUsers()
      .pipe(first())
        .subscribe(users => {
          this.users = users;

          this.users.map(element => {
            element.customClaims.admin ? this.totalAdmin = this.totalAdmin + 1 : ''
            element.customClaims.student ? this.totalStudent = this.totalStudent + 1 : ''
            element.customClaims.school ? this.totalSchool = this.totalSchool + 1 : ''
            element.customClaims.parent ? this.totalParent = this.totalParent + 1 : ''
          });
          
        });
  }

}
