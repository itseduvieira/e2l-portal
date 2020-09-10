import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-detail',
    templateUrl: './detail-register.component.html',
    styleUrls: ['./detail-register.component.scss']
})

export class DetailRegisterComponent implements OnInit{
    email: string;
    company: string;
    gaccount: string;

    constructor() {}

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.email = currentUser.email;
        this.company = currentUser.company;
        this.gaccount = currentUser.gaccount;
    }
}