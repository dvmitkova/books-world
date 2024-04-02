import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogggedIn = false;

  constructor(private afs: AngularFireAuth, private toastr: ToastrService) {}

  login(email: string, password: string) {
    this.afs.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('Logged in successfully');
    })
  }

  register(user: { email: string; password: string }) {
    console.log(user);

    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }
}
