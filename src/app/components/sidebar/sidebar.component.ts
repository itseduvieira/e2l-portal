import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-bar-32 text-blue', class: '' },
    { path: '/adm', title: 'Administração',  icon:'ni-circle-08 text-blue', class: '' },
    // { path: '/customers', title: 'Meus Clientes',  icon:'ni-briefcase-24 text-blue', class: '' },
    // { path: '/customers/new', title: 'Adicionar Cliente',  icon:'ni-circle-08 text-blue', class: '' },
    // { path: '/revenue', title: 'Minhas Vendas',  icon:'ni-cart text-blue', class: '' },
    // { path: '/user-profile', title: 'Meu Perfil',  icon:'ni-single-02 text-blue', class: '' },
    // { path: '/plans', title: 'Planos',  icon:'ni-money-coins text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.authenticationService.logout();

    this.router.navigate(['/login']);
  }
}
