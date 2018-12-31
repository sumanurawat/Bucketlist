//Routes file to manage angular routing
//In this file we declare all the routes with the respective components
//We can also attach services to routes like in this case I have attached AuthGuard

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { MembersComponent } from './members/members.component';
import { SignupComponent } from './signup/signup.component';
import { PersonalComponent } from './personal/personal.component';
import { MemberComponent } from './member/member.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './auth.service'

export const router: Routes = [
  //{ path: '', component: 'login', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'forget', component: ForgetpassComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'member/:id', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
