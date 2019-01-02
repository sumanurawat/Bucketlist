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
  email: any;
  password: any;
  user: Observable<firebase.User>;
  users: AngularFireList<any>;
  authState: any = null;
  error: any;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
        this.router.navigateByUrl('/members');//If user is logged in then proceed to profile page
      }
    });
  }

  loginFacebook() {
    //Facebook login using firebase api
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        if ((success.additionalUserInfo.isNewUser)) {
          var user = firebase.auth().currentUser;
          this.users = this.af.list(`users/${user.uid}`);
          this.af.object(`users/${user.uid}`).update({ name: user.displayName });//If the user is logging in for the first time then save the information
        }
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
        if ((success.additionalUserInfo.isNewUser)) {
          var user = firebase.auth().currentUser;
          this.users = this.af.list(`users/${user.uid}`);
          this.af.object(`users/${user.uid}`).update({ name: user.displayName });//If the user is logging in for the first time then save the information
        }
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
          this.error = err;
        });
  }

  onSubmit(formData) {
    if (formData.valid) {
      //If the form data is valid, take the user to the members page
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (success) => {
            this.router.navigate(['/members']);//In case of sign in using email, the information is already saved while signing up
          }).catch(
            (err) => {
              console.log(err);
              this.error = err;
            })
    }
  }


  ngOnInit() {
  }

}
