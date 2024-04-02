import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router // Inject Router
  ) {
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

    this.booksService.saveData(bookOfferData)
      .then((newBookId: string) => {
        this.router.navigate(['/book', newBookId]);
      }).catch((error) => {
        console.error('Error saving book:', error);
      });
  }
}