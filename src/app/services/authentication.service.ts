import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.firebaseAuth.signOut();
  }

  resetPassword(email: string): Promise<void> {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  authUser(): Observable<firebase.User> {
    return this.user;
  }
}
