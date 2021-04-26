import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fireAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
