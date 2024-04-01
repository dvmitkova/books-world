import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const bookOfferData = {
      name: formData.value.bookName,
      condition: formData.value.condition,
      points: formData.value.points,
    };

    this.booksService.saveData(bookOfferData)
  }
}
