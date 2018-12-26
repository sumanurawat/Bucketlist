import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [FilterPipe]
})

export class MembersComponent implements OnInit {

  authState: any = null;
  name: any;
  state: string = '';
  userId: string;
  error: any;
  likeUpdateLikes: any;
  searchText: any;

  /**** debug ****/
  user: Observable<firebase.User>;
  items: AngularFireList<any>;
  inditems: AngularFireList<any>;
  checkIndItems: AngularFireList<any>;
  tasks: Observable<any>
  msgVal: string = '';
  /**** debug ****/

  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
        this.user = this.afAuth.authState;
        this.name = this.authState['displayName'];//If the user is signed in, show the display name
        this.userId = this.authState['uid'];

        this.items = af.list('/messages', ref => ref.orderByChild('likes'));//Retrieving the data in AngularFireList
        this.inditems = af.list(`items/${this.userId}`, ref => ref.orderByChild('message'));//Also getting the user's personal list

        this.tasks = this.items.snapshotChanges().map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }));
        });
      }
    });
  }

  Add(value: string, likes: number, key: string) {
    this.checkIndItems = this.af.list(`items/${this.userId}`, ref => ref.orderByChild('message').equalTo(value));
    let objectSubscription = this.checkIndItems.snapshotChanges().subscribe(snapshot => {
      if (snapshot.length > 0) { //Check if item exists in user's list
        this.error = "Item already exists in your list";
        console.log("Item exists");
        objectSubscription.unsubscribe();
        this.router.navigateByUrl('/personal');
      }
      else {
        objectSubscription.unsubscribe();//Add item to user's list and update likes
        this.likeUpdateLikes = likes + 1;
        this.af.object('/messages/' + key).update({ likes: this.likeUpdateLikes });
        this.inditems.push({ message: value });
        this.router.navigateByUrl('/personal');
      }
    });
  }

  ngOnInit() {
  }

}
