import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState; 
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  logout() {
    localStorage.removeItem('currentUser');
    
    return firebase.auth().signOut();
  }  
}