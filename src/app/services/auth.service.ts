import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {from, Observable, of, Subject} from 'rxjs';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new Subject<User>();

  constructor(private fireAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  login(): void {
    this.fireAuth.auth
      .signInAnonymously()
      .then(userCredential => {
        if (userCredential.additionalUserInfo.isNewUser) {
          this.saveUser(userCredential.user);
        }
        this.currentUser.next(userCredential.user);
      });
  }

  getCurrentUser(): Subject<User> {
    return this.currentUser;
  }

  getCurrentUserId(): string {
    return this.fireAuth.auth.currentUser.uid;
  }

  isUserLoggedIn(): boolean {
    return !!this.fireAuth.auth.currentUser;
  }

  saveUser(user: User) {
    this.db.collection('users').doc(user.uid)
      .set(user.toJSON())
      .then(res => {
      })
      .catch(error => {
      });
  }
}
