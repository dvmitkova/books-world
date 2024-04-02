// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router'; // Import Router
// import { BooksService } from 'src/app/services/books.service';
// import { Book } from 'src/app/types/book';

// @Component({
//   selector: 'app-offer-form',
//   templateUrl: './offer-form.component.html',
//   styleUrls: ['./offer-form.component.css'],
// })
// export class OfferFormComponent implements OnInit {
//   bookForm: FormGroup;
//   book: any;
//   formStatus: string = 'Offer new';

//   constructor(
//     private booksService: BooksService,
//     private fb: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.route.queryParams.subscribe((value) => {
//       const id = value['id'];

//       this.book = this.booksService.loadOneBookData(id).subscribe((book) => {
//         this.book = book;

//         this.bookForm = this.fb.group({
//           name: [this.book.name, Validators.required],
//           author: [this.book.author, Validators.required],
//           condition: [this.book.condition, Validators.required],
//           points: [this.book.points, Validators.required],
//           description: [
//             this.book.description,
//             [Validators.required, Validators.minLength(10)],
//           ],
//           pages: [this.book.pages],
//           image: [this.book.image],
//         });
//         this.formStatus = 'Edit';
//       });
//     });

//     this.bookForm = this.fb.group({
//       name: ['', Validators.required],
//       author: ['', Validators.required],
//       condition: [null, Validators.required],
//       points: ['', Validators.required],
//       description: ['', [Validators.required, Validators.minLength(10)]],
//       pages: [''],
//       image: [''],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     if (this.bookForm.invalid) {
//       return;
//     }

//     const imageValue = this.bookForm.value.image;

//     const bookOfferData: Book = {
//       name: this.bookForm.value.name,
//       condition: this.bookForm.value.condition,
//       points: this.bookForm.value.points,
//       description: this.bookForm.value.description,
//       pages: this.bookForm.value.pages || 0,
//       author: this.bookForm.value.author,
//       image: imageValue,
//       added: new Date(),
//       wishlist: [],
//       ordered: 0,
//     };

//     this.booksService
//       .saveData(bookOfferData)
//       .then((newBookId: string) => {
//         this.router.navigate(['/book', newBookId]);
//       })
//       .catch((error) => {
//         console.error('Error saving book:', error);
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  bookForm!: FormGroup;
  book: any; // Change the type as needed
  formStatus: string = 'Offer new';

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      const id = value['id'];

      if (id) {
        this.booksService.loadOneBookData(id).subscribe((book: any) => { // Adjust the type as needed
          this.book = book;

          this.bookForm = this.fb.group({
            name: [this.book.name || '', Validators.required], // Check if 'name' exists
            author: [this.book.author || '', Validators.required], // Check if 'author' exists
            condition: [this.book.condition || null, Validators.required], // Check if 'condition' exists
            points: [this.book.points || '', Validators.required], // Check if 'points' exists
            description: [
              this.book.description || '',
              [Validators.required, Validators.minLength(10)],
            ],
            pages: [this.book.pages || ''],
            image: [this.book.image || ''],
          });

          this.formStatus = 'Edit';
        });
      }
    });

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      condition: [null, Validators.required],
      points: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pages: [''],
      image: [''],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    const imageValue = this.bookForm.value.image;

    const bookOfferData: Book = {
      name: this.bookForm.value.name,
      condition: this.bookForm.value.condition,
      points: this.bookForm.value.points,
      description: this.bookForm.value.description,
      pages: this.bookForm.value.pages || 0,
      author: this.bookForm.value.author,
      image: imageValue,
      added: new Date(),
      wishlist: [],
      ordered: 0,
    };

    this.booksService
      .saveData(bookOfferData)
      .then((newBookId: string) => {
        this.router.navigate(['/book', newBookId]);
      })
      .catch((error) => {
        console.error('Error saving book:', error);
      });
  }
}