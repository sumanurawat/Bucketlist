import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

   authState: any = null;
   state: string = '';
   error: any;


   constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router){
     this.afAuth.authState.subscribe((auth) => {
       if(auth)//If the user is signed in, navigate to members page
       {
         this.authState = auth;
         this.router.navigateByUrl('/members');
       }
     });
   }


 onSubmit(formData) {
   if(formData.valid) {
     //If the form data is valid, take the user to the members page
     this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
     .then(
       (success) => {
       console.log(success);
       this.router.navigate(['/members']);
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
