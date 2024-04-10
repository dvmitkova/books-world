import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    private router: Router
  ) {
      // Listen for changes to the authentication state
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // User is logged in
          this.loggedIn.next(true);
          this.isLoggedInGuard = true;
        } else {
          // User is logged out
          this.loggedIn.next(false);
          this.isLoggedInGuard = false;
        }
      });
  }

  getCurrentUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          resolve(user.uid); // Resolve with the user's UID
        } else {
          resolve(null); // Resolve with null if no user is logged in
        }
      });
    });
  }

  getCurrentUserEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          resolve(user.email); // Resolve with the user's email
        } else {
          resolve(null); // Resolve with null if no user is logged in
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
        // Clear user data from local storage if user is null
        localStorage.removeItem('user');
      }
    });
  }

  register(email: string, password: string) {

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('You were successfully registered');
        this.loggedIn.next(false);
        this.isLoggedInGuard = false;
        this.router.navigate(['/auth/login']);
      })
      .catch(e => {
        this.toastr.warning(e);
      });

    // return this.afAuth.createUserWithEmailAndPassword(email, password);
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
