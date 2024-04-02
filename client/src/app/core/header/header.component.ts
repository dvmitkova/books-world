import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail!: string;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.email) {
        this.userEmail = user.email;
      }
    }
  }
  onLogout() {
    this.userService.logout();
  }
}
