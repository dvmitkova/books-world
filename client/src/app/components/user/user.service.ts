import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogggedIn = false;

  constructor(private afs: AngularFireAuth, private toastr: ToastrService, private router: Router) {}

  login(email: string, password: string) {
    this.afs.signInWithEmailAndPassword(email, password).then((logRef) => {
      this.toastr.success('Logged in successfully');
    }).catch(e => {
      this.toastr.warning(e);
    })
  }

  loadUser() {
    this.afs.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  register(user: { email: string; password: string }) {
    console.log(user);

    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }
  
  logout() {
    this.afs.signOut().then(() => {
      this.toastr.success('User logged out successfully');
      this.router.navigate(['/auth/login'])
    })
  }
}
