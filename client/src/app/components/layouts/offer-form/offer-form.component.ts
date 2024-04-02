// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BooksService } from 'src/app/services/books.service';
// import { Book } from 'src/app/types/book';

// @Component({
//   selector: 'app-offer-form',
//   templateUrl: './offer-form.component.html',
//   styleUrls: ['./offer-form.component.css'],
// })
// export class OfferFormComponent implements OnInit {
//   selectedImg: any;
//   bookForm: FormGroup;

//   constructor(private booksService: BooksService, private fb: FormBuilder) {
//     this.bookForm = this.fb.group({
//       name: ['', [Validators.required]],
//       author: ['', Validators.required],
//       condition: [null, Validators.required],
//       points: ['', Validators.required],
//       description: ['', Validators.required],
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
  
//     if (typeof imageValue === 'string') {
//       // If the image value is a URL, use it directly
//       const bookOfferData: Book = {
//         name: this.bookForm.value.name,
//         condition: this.bookForm.value.condition,
//         points: this.bookForm.value.points,
//         description: this.bookForm.value.description,
//         pages: this.bookForm.value.pages || 0,
//         author: this.bookForm.value.author,
//         image: imageValue, // Use the URL directly
//         added: '',
//         wishlist: '',
//         ordered: '',
//       };
  
//       console.log(bookOfferData);
  
//       this.booksService.saveData(bookOfferData);
  
//       this.bookForm.reset();
//     } else {
//       // If the image value is a file, read it as data URL
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64String = event.target?.result as string;
  
//         const bookOfferData: Book = {
//           name: this.bookForm.value.name,
//           condition: this.bookForm.value.condition,
//           points: this.bookForm.value.points,
//           description: this.bookForm.value.description,
//           pages: this.bookForm.value.pages || 0,
//           author: this.bookForm.value.author,
//           image: base64String,
//           added: '',
//           wishlist: '',
//           ordered: '',
//         };
  
//         console.log(bookOfferData);
  
//         this.booksService.saveData(bookOfferData);
  
//         this.bookForm.reset();
//       };
  
//       reader.readAsDataURL(this.selectedImg);
//     }
//   }
// }

// 2

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BooksService } from 'src/app/services/books.service';
// import { Book } from 'src/app/types/book';

// @Component({
//   selector: 'app-offer-form',
//   templateUrl: './offer-form.component.html',
//   styleUrls: ['./offer-form.component.css'],
// })
// export class OfferFormComponent implements OnInit {
//   selectedImg: any;
//   bookForm: FormGroup;

//   constructor(private booksService: BooksService, private fb: FormBuilder) {
//     this.bookForm = this.fb.group({
//       name: ['', [Validators.required]],
//       author: ['', Validators.required],
//       condition: [null, Validators.required],
//       points: ['', Validators.required],
//       description: ['', Validators.required],
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
  
//     if (typeof imageValue === 'string') {
//       // If the image value is a URL, use it directly
//       const bookOfferData: Book = {
//         name: this.bookForm.value.name,
//         condition: this.bookForm.value.condition,
//         points: this.bookForm.value.points,
//         description: this.bookForm.value.description,
//         pages: this.bookForm.value.pages || 0,
//         author: this.bookForm.value.author,
//         image: imageValue,
//         added: new Date().toISOString(),
//         wishlist: [],
//         ordered: 0,
//       };
  
//       console.log(bookOfferData);
  
//       this.booksService.saveData(bookOfferData);
  
//       this.bookForm.reset();
//     } else {
//       // If the image value is a file, read it as data URL
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64String = event.target?.result as string;
  
//         const bookOfferData: Book = {
//           name: this.bookForm.value.name,
//           condition: this.bookForm.value.condition,
//           points: this.bookForm.value.points,
//           description: this.bookForm.value.description,
//           pages: this.bookForm.value.pages || 0,
//           author: this.bookForm.value.author,
//           image: base64String,
//           added: new Date().toISOString(), // Set the added field to the current date and time
//           wishlist: [], // Initialize wishlist as an empty array
//           ordered: 0, // Initialize ordered count as 0
//         };
  
//         console.log(bookOfferData);
  
//         this.booksService.saveData(bookOfferData);
  
//         this.bookForm.reset();
//       };
  
//       reader.readAsDataURL(this.selectedImg);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  bookForm: FormGroup;

  constructor(private booksService: BooksService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', Validators.required],
      condition: [null, Validators.required],
      points: ['', Validators.required],
      description: ['', Validators.required],
      pages: [''],
      image: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }
  
    const imageValue = this.bookForm.value.image;
  
    // If the image value is a URL, use it directly
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

    console.log(bookOfferData);

    this.booksService.saveData(bookOfferData);

    this.bookForm.reset();
  }
}