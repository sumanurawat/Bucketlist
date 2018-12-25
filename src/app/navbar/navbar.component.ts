import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authState: any = null;
  name: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
        this.name = this.authState['displayName'];//If the user is signed in, show the display name
        if (this.name == null) {
          this.name = this.authState.email;
        }
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
