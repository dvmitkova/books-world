import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-offers-list-section',
  templateUrl: './offers-list-section.component.html',
  styleUrls: ['./offers-list-section.component.css'],
})
export class OffersListSectionComponent implements OnInit {

  booksArray!: Array<object>;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data) => {
      console.log(data);
      this.booksArray = data;
    });
  }
}
