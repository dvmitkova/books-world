import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn$!: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.isLoggedIn$ = this.userService.isLoggedIn();
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user && user.email) {
            this.userEmail = user.email;
          }
        }
      } else {
        this.userEmail = '';
      }
    });


  }

  onLogout() {
    this.userService.logout();
  }
}
