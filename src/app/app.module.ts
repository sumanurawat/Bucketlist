import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';


export const firebaseConfig = {
    apiKey: "AIzaSyCOzh6eVbH-Q_a2BSZfy4hbTQ6JUiZLc1o",
    authDomain: "bucketlist-f7437.firebaseapp.com",
    databaseURL: "https://bucketlist-f7437.firebaseio.com",
    projectId: "bucketlist-f7437",
    storageBucket: "bucketlist-f7437.appspot.com",
    messagingSenderId: "348248410009"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
