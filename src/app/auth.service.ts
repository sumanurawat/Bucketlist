//AuthState service checks if the user is signedin/active
//If the user is not active then it redirects the user to login page

import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { Observable, from  } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AngularFireAuth, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.auth.authState
        .take(1)
        .map(authState => !!authState)
        .do(authenticated => {
      if
        (!authenticated) this.router.navigate([ '/login' ]);
      })
    }

}
