// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-offer-book',
//   templateUrl: './offer-book.component.html',
//   styleUrls: ['./offer-book.component.css']
// })
// export class OfferBookComponent {

// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-offer-book',
  templateUrl: './offer-book.component.html',
  styleUrls: ['./offer-book.component.css']
})
export class OfferBookComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the isLoggedIn Observable from UserService
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}