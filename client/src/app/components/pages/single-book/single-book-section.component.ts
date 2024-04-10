import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-single-book-section',
  templateUrl: './single-book-section.component.html',
  styleUrls: ['./single-book-section.component.css'],
})
export class SingleBookSectionComponent implements OnInit {
  bookId!: string | null;
  book!: Book | undefined;
  isWishlistAdded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      if (this.bookId) {
        this.fetchBookDetails(this.bookId);
      }
    });
  }

  fetchBookDetails(bookId: string): void {
    this.booksService.getBookById(bookId).subscribe((book: any) => {
      this.book = book;
    });
  }

  addToWishlist(): void {
    // Add logic to add book to wishlist
    // For demonstration purposes, I'm setting isWishlistAdded to true
    this.isWishlistAdded = true;
    this.toastr.success('Added to your wishlist');
  }

  onDelete(bookId: string) {
    this.booksService.deleteData(bookId);
  }
}
