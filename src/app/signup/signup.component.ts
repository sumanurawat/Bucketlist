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
  error: any;
  form: FormGroup;

  constructor(public af: AngularFireAuth, private router: Router, private formBuilder: FormBuilder) {
  }

  onSubmit(formData) {
    if(formData.valid) {
      //If the form is valid, call firebase method to create user with email
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  ngOnInit() {
    //Form validation code
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

}
