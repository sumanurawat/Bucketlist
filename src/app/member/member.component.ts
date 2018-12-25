import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  authState: any = null;
  error: any;
  userId: string;
  id: any;
  result: any;
  likeUpdateResult: any;
  likeUpdateLikes: any;
  item: any;
  likes: any;
  inditems: AngularFireList<any>;
  checkIndItems: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase, private route: ActivatedRoute) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
        this.userId = this.authState['uid'];
        this.inditems = af.list(`items/${this.userId}`, ref => ref.orderByChild('message'));
      }
    });
  }

  Add() {
    console.log(this.item);
    this.checkIndItems = this.af.list(`items/${this.userId}`, ref => ref.orderByChild('message').equalTo(this.item));
    let objectSubscription = this.checkIndItems.snapshotChanges().subscribe(snapshot => {
      if (snapshot.length > 0) { //Check if item is already in user's list
        this.error = "Item already exists in your list";
        console.log("Item exists");
        objectSubscription.unsubscribe();//Unsubscribe is important as snapshotChanges will be called again as soon as the list is updated
        this.router.navigateByUrl('/personal');
      }
      else {
        objectSubscription.unsubscribe();
        let objectSubscription1 = this.af.object('messages/' + this.id).valueChanges().subscribe(res => {
          this.likeUpdateResult = res;
          this.likeUpdateLikes = (Number)(this.likeUpdateResult.likes);
          objectSubscription1.unsubscribe();
          this.likeUpdateLikes = this.likeUpdateLikes + 1;
          this.af.object('/messages/' + this.id).update({ likes: this.likeUpdateLikes });//Update the likes
          this.inditems.push({ message: this.item });//Add the item
          this.router.navigateByUrl('/personal');
        });
      }
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];//Get the id of the item
    this.af.object('messages/' + this.id).valueChanges().subscribe(res => {
      this.result = res;
      this.item = this.result.message;
      this.likes = Number(this.result.likes);
    });
  }

}
