import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    createUser(user: User) {
        return this.http.post<User[]>(`${environment.apiUrl}/user`, user);
    }

    getAllUsers() {
        return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }
}