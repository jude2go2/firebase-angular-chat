import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (user !== null) {
      this.isLoggedIn$.next(true);
    }
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('user');
        this.isLoggedIn$.next(false);
      }
    });
  }

  // Returns true when user is looged in and email is verified
  public isLoggedIn(): Observable<boolean> {
    // const user = JSON.parse(localStorage.getItem('user') || '');
    // return user !== null && user.emailVerified !== false ? true : false;
    return this.isLoggedIn$.asObservable();
  }

  // Sign in with Google
  public GoogleAuth(): any /*returns the google signup popup*/ {
    return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  private AuthLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(<User>result.user);
        console.log('User Logged In!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private SetUserData(user: User | null): Promise<void> | void {
    if (!user) return;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
