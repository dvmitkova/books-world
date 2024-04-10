import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  isBookOrdered: boolean = false;
  @Output() addToWishlistEvent = new EventEmitter<Book>();
  @Output() addToOrderedBooksEvent = new EventEmitter<Book>();

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
    this.booksService.deleteData(bookId);
  }
}


//Adding buttons visibility conditions:
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { BooksService } from 'src/app/services/books.service';
// import { Book } from 'src/app/types/book';
// import { UserService } from 'src/app/components/user/user.service';

// @Component({
//   selector: 'app-single-book-section',
//   templateUrl: './single-book-section.component.html',
//   styleUrls: ['./single-book-section.component.css'],
// })
// export class SingleBookSectionComponent implements OnInit {
//   bookId!: string | null;
//   book!: Book | undefined;
//   isWishlistAdded: boolean = false;
//   isLoggedIn: boolean = false;
//   loggedInUserId: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private booksService: BooksService,
//     private toastr: ToastrService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       this.bookId = params.get('id');
//       if (this.bookId) {
//         this.fetchBookDetails(this.bookId);
//       }
//     });

//     this.userService.isLoggedIn().subscribe(loggedIn => {
//       this.isLoggedIn = loggedIn;
//       if (loggedIn) {
//         this.userService.getCurrentUserId().then(userId => {
//           this.loggedInUserId = userId;
//         });
//       } else {
//         this.loggedInUserId = null;
//       }
//     });
//   }

//   fetchBookDetails(bookId: string): void {
//     this.booksService.getBookById(bookId).subscribe((book: any) => {
//       this.book = book;
//     });
//   }

//   addToWishlist(): void {
//     // Add logic to add book to wishlist
//     // For demonstration purposes, I'm setting isWishlistAdded to true
//     this.isWishlistAdded = true;
//     this.toastr.success('Added to your wishlist');
//   }

//   onDelete(bookId: string) {
//     this.booksService.deleteData(bookId);
//   }
// }