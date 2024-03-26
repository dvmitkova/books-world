import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserForAuth } from 'src/app/types/user';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from 'src/app/shared/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http
    .post<UserForAuth>(USER_LOGIN_URL, {email, password})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}
