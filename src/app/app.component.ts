//Importing the required components of the modules
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  items: AngularFireList<any>;
  tasks: Observable<any>
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/messages', ref =>
      ref.limitToFirst(50)
    );//Retrieving the data in AngularFireList
    this.tasks = this.items.valueChanges();//Converting it to an observable to see any value change and this is pushed to html
    this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  Send(desc: string) : void {
      this.items.push({ message: desc, done: true});//Pushing the object to firebase database af
      this.msgVal = '';
  }
}
