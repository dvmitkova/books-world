import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-all-books-section',
  templateUrl: './all-books-section.component.html',
  styleUrls: ['./all-books-section.component.css']
})
export class AllBooksSectionComponent implements OnInit {

  booksArray: any[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((books: any[]) => {
      this.booksArray = books.map(book => {
        const id = book.payload.doc.id;
        const data = book.payload.doc.data();
        return { id, ...data }
      });
    });
  }

}
