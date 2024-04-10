import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/types/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  isLoggedIn: boolean = false;
  wishlist: any[] = [];
  isLoading: boolean = true;
  booksArray!: any[];

  constructor(
    private userService: UserService,
    private router: Router,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(['/auth/login']);
      }
    });

    this.userService
      .getCurrentUserId()
      .then((userId) => {
        if (userId) {
          this.booksService.getWishlist(userId).subscribe(
            (data: any[]) => {
              this.booksArray = data.map((item) => ({
                id: item.id,
                data: item.data as Book,
              }));
              this.isLoading = false;
            },
            (error) => {
              console.error('Error loading wishlist:', error);
              this.isLoading = false;
            }
          );
        }
      })
      .catch((error) => {
        console.error('Error getting user ID:', error);
        this.isLoading = false;
      });
  }

  addToWishlist(bookId: string): void {
    this.userService
      .getCurrentUserId()
      .then((userId) => {
        if (userId) {
          this.booksService
            .addToWishlist(userId, bookId)
            .then(() => {})
            .catch((error) => {
              console.error('Error adding book to wishlist:', error);
            });
        } else {
        }
      })
      .catch((error) => {
        console.error('Error getting user ID:', error);
      });
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }
}
