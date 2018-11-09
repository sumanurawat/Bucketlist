import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  authState: any = null;
  name: any;
  state: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth)
      {
        this.authState = auth;
        this.name = this.authState['displayName'];
      }
    });
  }

  logout() {
     this.afAuth.auth.signOut();
     this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

}
