import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private afs: AngularFirestore,
  ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.loggedIn.next(true);
          this.isLoggedInGuard = true;
        } else {
          this.loggedIn.next(false);
          this.isLoggedInGuard = false;
        }
      });
  }

  getCurrentUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          resolve(user.uid); 
        } else {
          resolve(null);
        }
      });
    });
  }

  getCurrentUserEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          resolve(user.email);
        } else {
          resolve(null);
        }
      });
    });
  }

  login(email: string, password: string) {
    
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Logged in successfully');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch(e => {
        this.toastr.warning(e);
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        const userEmail = user.email;
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  register(name: string, email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((logRef) => {
        return this.afs.collection('users').doc(logRef.user?.uid).set({
          email: email
        }).then(() => {
          this.toastr.success('You were successfully registered');
          this.loggedIn.next(false);
          this.isLoggedInGuard = false;
          this.router.navigate(['/auth/login']);
        });
      })
      .catch(e => {
        this.toastr.warning(e);
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('User logged out successfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.router.navigate(['/auth/login']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
