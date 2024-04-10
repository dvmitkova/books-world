import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-recently-added-books',
  templateUrl: './recently-added-books.component.html',
  styleUrls: ['./recently-added-books.component.css'],
})
export class RecentlyAddedBooksComponent implements OnInit {
  isLoading: boolean = true;
  booksArray!: any[];
  isWishlistAdded: boolean = false;
  isBookOrdered: boolean = false;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe(
      (data: any[]) => {
        this.booksArray = data.map((item) => ({
          id: item.id,
          data: item.data as Book,
        }));
        this.booksArray.sort(
          (a, b) =>
            b.data.added.toDate().getTime() - a.data.added.toDate().getTime()
        );
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false; 
      }
    );
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

  addToWishlist(): void {
    this.isWishlistAdded = true;
    this.toastr.success('Added to your wishlist');

  }

  addToOrderedBooks() {
    this.isWishlistAdded = true;
    this.toastr.success('Added to your shopping bag');

  }
}
