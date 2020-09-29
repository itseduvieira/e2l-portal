import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { AuthenticationService } from '../../services/authentication.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-bar-32 text-blue', class: '' },
    { path: '/customers', title: 'Usuários',  icon:'ni-circle-08 text-blue', class: '' }
];

export const ROUTES2: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-bar-32 text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public currentUser: any;
  public user: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.user = this.currentUser;

    if (this.currentUser.customClaims.admin) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES2.filter(menuItem => menuItem);
    }
    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.authenticationService.logout();

    this.router.navigate(['/login']);
  }
}
