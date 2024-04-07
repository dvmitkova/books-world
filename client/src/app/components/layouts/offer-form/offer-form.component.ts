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
  book: any;
  formStatus: string = 'Offer new';
  bookId: string | null = null;

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.bookId = id;
        this.booksService.loadOneBookData(id).subscribe((book: any) => {
          this.book = book;
          this.bookForm.patchValue(book); // Populate the form with book data
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
      added: '',
      wishlist: [],
      ordered: 0,
    };

    if (this.formStatus === 'Offer new') {
      this.booksService
        .saveData(bookOfferData)
        .then((newBookId: string) => {
          this.router.navigate(['/book', newBookId]);
        })
        .catch((error) => {
          console.error('Error saving book:', error);
        });
    } else if (this.formStatus === 'Edit') {

      if (this.formStatus === 'Edit' && this.bookId !== null) {
        const bookId = this.bookId; // Use the assigned bookId property
        this.booksService
          .updateData(bookId, bookOfferData)
          .then(() => {
            this.router.navigate(['/book', bookId]);
          })
          .catch((error) => {
            console.error('Error updating book:', error);
          });
      }
    }
  }
}
