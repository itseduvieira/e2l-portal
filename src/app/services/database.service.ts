import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { AuthenticationService } from './authentication.service';
import Model from '../models/database.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore, private authService: AuthenticationService) { }

  // save(model: Model): Observable<DocumentReference> {
  //   const obj = {...model};
    
  //   delete obj.collection;

  //   return this.authService.userData.pipe( 
  //     mergeMap(auth => from(
  //       this.db.collection('adm').doc(auth.uid).collection(model.collection).add(obj)
  //     )) 
  //   );
  // }
}