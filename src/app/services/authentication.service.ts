import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

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

  forgetPassword(emailAddress) {
    return firebase.auth().sendPasswordResetEmail(emailAddress)
  }

  verifiedEmail() {
    firebase.auth().languageCode = 'pt_BR';
  
    return firebase.auth().currentUser.sendEmailVerification()
  }
}