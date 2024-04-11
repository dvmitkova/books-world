import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-single-book-section',
  templateUrl: './single-book-section.component.html',
  styleUrls: ['./single-book-section.component.css'],
})
export class SingleBookSectionComponent implements OnInit {
  bookId!: string | null;
  book!: Book | undefined;
  isWishlistAdded: boolean = false;
  isBookOrdered: boolean = false;
  isLoggedIn: boolean = false;
  @Output() addToWishlistEvent = new EventEmitter<Book>();
  @Output() addToOrderedBooksEvent = new EventEmitter<Book>();

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      if (this.bookId) {
        this.fetchBookDetails(this.bookId);
      }
    });

    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

  }

  fetchBookDetails(bookId: string): void {
    this.booksService.getBookById(bookId).subscribe((book: any) => {
      this.book = book;
    });
  }

  addToWishlist(): void {
    this.isWishlistAdded = true;
    this.toastr.success('Added to your wishlist');
    if (this.book) {
      this.addToWishlistEvent.emit(this.book);
    }
  }

  addToOrderedBooks() {
    this.isWishlistAdded = true;
    this.toastr.success('Added to your shopping bag');
    if (this.book) {
      this.addToOrderedBooksEvent.emit(this.book);
    }
  }

  onDelete(bookId: string) {
    if (this.isLoggedIn) {
      this.booksService.deleteData(bookId);
    } else {
      this.toastr.warning('Please log in to delete this book.');
      this.router.navigate(['/auth/login']);
    }
  }
}
