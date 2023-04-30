import { Injectable } from "@angular/core";
import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "firebase/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("You have been successfully logged in!", result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log("You have been successfully logged out!");
    });
  }
}
