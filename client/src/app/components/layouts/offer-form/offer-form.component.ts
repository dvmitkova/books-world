import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  onSubmit(formData: NgForm) {
    // if (formData.invalid) {
    //   return;
    // }

    const bookOfferData: Book = {
      name: formData.value.name,
      condition: formData.value.condition,
      points: formData.value.points,
    };

    this.booksService.saveData(bookOfferData);
  }
}
