import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;
  authState: any = null;
  error: any;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router){
    this.user = afAuth.authState;
    //this.user.subscribe( auth => {
    //  if(auth)
      //{
        //this.router.navigateByUrl('/members');
      //}
    //});
    this.afAuth.authState.subscribe((auth) => {
      if(auth)
      {
        this.authState = auth;
        this.router.navigateByUrl('/members');
      }
    });
  }

  loginFacebook() {
    //Facebook login using firebase api
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    //Google signin using firebase api
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      });
  }


  ngOnInit() {
  }

}
