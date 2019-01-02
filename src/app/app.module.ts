//We declare all the modules, configurations, imports, components and services we would be using in our project
//Export this module

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
import { GoogleChart } from './angular2-google-chart.directive';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { environment } from '../environments/environment';
import { firebaseConfig } from '../environments/firebase.config';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HomenavComponent } from './homenav/homenav.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { FilterPipe } from './filter.pipe';
import { PersonalComponent } from './personal/personal.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MemberComponent } from './member/member.component';
import { MapComponent } from './map/map.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MembersComponent,
    NavbarComponent,
    HomeComponent,
    HomenavComponent,
    ForgetpassComponent,
    PersonalComponent,
    FilterPipe,
    MemberComponent,
    MapComponent,
    GoogleChart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),//Imported from environment/firebase.config.ts
    AngularFirestoreModule,
    FlashMessagesModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AmChartsModule,
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
