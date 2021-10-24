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
  private userData: User | null = null; // Save logged in user data

  private userData$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  
  public somthing: boolean = true;

  public somthing: boolean = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    const userString: string | null = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user !== null) {
      this.isLoggedIn$.next(true);
    }
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.userData = <User>user;
        localStorage.setItem('user', JSON.stringify(<User>user));
        this.userData$.next(<User>user);
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('user');
        this.isLoggedIn$.next(false);
      }
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  // Sign in with Google
  public GoogleAuth(): any /*returns the google signup popup*/ {
    return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider()).then(
      () => {
        this.router.navigate(['chat']);
      }
    );
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

  public getUserData(): Observable<User | null> {
    return this.userData$.asObservable();
  }
}
