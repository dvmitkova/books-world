import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-book',
  templateUrl: './offer-book.component.html',
  styleUrls: ['./offer-book.component.css']
})
export class OfferBookComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the isLoggedIn Observable from UserService
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (!this.isLoggedIn) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}