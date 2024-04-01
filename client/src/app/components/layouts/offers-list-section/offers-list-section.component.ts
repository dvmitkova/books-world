import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offers-list-section',
  templateUrl: './offers-list-section.component.html',
  styleUrls: ['./offers-list-section.component.css'],
})
export class OffersListSectionComponent implements OnInit {

  booksArray!: Book[];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      console.log(data);
      this.booksArray = data.map(item => item.data as Book);
    });
  }
}

//!Да се изтрие целия компонент!!