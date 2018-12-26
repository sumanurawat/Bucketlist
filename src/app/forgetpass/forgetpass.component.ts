import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  state: string = '';
  message: any;
  form: FormGroup;
  email: any;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireAuth, private router: Router, private formBuilder: FormBuilder) {
  }

  onSubmit(formData) {
    if (formData.valid) {
      //If the form is valid, call firebase method to send password reset email
      this.af.auth.sendPasswordResetEmail(formData.value.email)
        .then(
          (success) => {
            this.message = "Password reset email sent.";
          }).catch(
            (err) => {
              console.log(err);
              this.message = err;
            })
    }
  }

  ngOnInit() {
    //Form validation code
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

}
