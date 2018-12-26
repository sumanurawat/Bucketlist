import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  authState: any = null;
  name: any;
  state: string = '';
  user: Observable<firebase.User>;
  userDetails: Observable<any>;
  items: AngularFireList<any>;
  checkItems: AngularFireList<any>;
  inditems: AngularFireList<any>;
  checkIndItems: AngularFireList<any>;
  tasks: Observable<any>
  msgVal: string = '';
  userId: string;
  id: any;
  result: any;
  likes: number;
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
        this.name = this.authState['displayName'];//If the user is signed in, show the display name
        this.userId = this.authState['uid'];
        this.items = af.list('/messages');//Retrieving the data in AngularFireList
        this.inditems = af.list(`items/${this.userId}`, ref => ref.orderByChild('message'));
        this.tasks = this.inditems.snapshotChanges().map(changes => { //Map the values to get key of items
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }));
        });
        this.user = this.afAuth.authState;
      }
    });
  }

  Send(desc: string): void {
    this.error = '';
    this.msgVal = '';
    if (desc == '') {
      this.error = "Please enter an item";
      return;
    }
    this.checkItems = this.af.list('/messages', ref => ref.orderByChild('message').equalTo(desc));
    this.checkIndItems = this.af.list(`items/${this.userId}`, ref => ref.orderByChild('message').equalTo(desc));
    let objectSubscription = this.checkIndItems.snapshotChanges().subscribe(snapshot => {
      if (snapshot.length > 0) { //If item alreay exists in user's list then do nothing
        this.error = "Item already exists in your list";
        objectSubscription.unsubscribe();
        return;
      }
      else {
        objectSubscription.unsubscribe();
        let objectSubscription1 = this.checkItems.snapshotChanges().subscribe(snapshot => {
          if (snapshot.length > 0) {//If item exists in main list then redirect to items page from where user can add
            objectSubscription1.unsubscribe();
            this.router.navigateByUrl('/member/' + snapshot[0].key);
            return;
          }
          else {
            objectSubscription1.unsubscribe();//Otherwise add as a new entity
            this.items.push({ message: desc, likes: 1 });
            this.inditems.push({ message: desc });
          }
        });
      }
    });
  }

  Remove(id: string, value: string): void {
    this.inditems.remove(id);//Remove the item from user's list
    let objectSubscription1 = this.af.list('/messages', ref => ref.orderByChild('message').equalTo(value)).snapshotChanges().subscribe(snapshot => {
      this.id = String(snapshot[0].key);//Get the key of the deleted item to reduce the likes value by one
      objectSubscription1.unsubscribe();
      let objectSubscription2 = this.af.object('messages/' + this.id).valueChanges().subscribe(res => {
        this.result = res;
        objectSubscription2.unsubscribe();
        this.likes = (Number)(this.result.likes);
        this.likes = this.likes - 1;
        this.af.object('/messages/' + this.id).update({ likes: this.likes });
      });
    });
  }

  ngOnInit() {
  }

}
