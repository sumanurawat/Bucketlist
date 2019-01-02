import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  state: string = '';
  users: AngularFireList<any>;
  error: any;
  form: FormGroup;
  name: any;
  email: any;
  password: any;

  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public af: AngularFireAuth, private router: Router, private formBuilder: FormBuilder) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      //If the form is valid, call firebase method to create user with email
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (success) => {
            if ((success.additionalUserInfo.isNewUser)) {
              var user = firebase.auth().currentUser;//If the user is logging in for the first time then save the information
              this.users = this.afd.list(`users/${user.uid}`);
              this.afd.object(`users/${user.uid}`).update({ name: formData.value.name });
            }
            this.router.navigate(['/members'])
          }).catch(
            (err) => {
              console.log(err);
              this.error = err;
            })
    }
  }

  loginFacebook() {
    //Facebook login using firebase api
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        if ((success.additionalUserInfo.isNewUser)) {
          var user = firebase.auth().currentUser;
          this.users = this.afd.list(`users/${user.uid}`);
          this.afd.object(`users/${user.uid}`).update({ name: user.displayName });
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
          this.users = this.afd.list(`users/${user.uid}`);
          this.afd.object(`users/${user.uid}`).update({ name: user.displayName });
        }
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
          this.error = err;
        });
  }

  ngOnInit() {
    //Form validation code
    this.form = this.formBuilder.group({
      name: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

}
