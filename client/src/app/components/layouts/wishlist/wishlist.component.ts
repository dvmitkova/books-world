import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
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
