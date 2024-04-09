import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Check if the user is logged in
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      // Redirect to login page if not logged in
      if (!this.isLoggedIn) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}