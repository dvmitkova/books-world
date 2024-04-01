import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-all-books-section',
  templateUrl: './all-books-section.component.html',
  styleUrls: ['./all-books-section.component.css']
})
export class AllBooksSectionComponent implements OnInit {

  booksArray!: Book[];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      console.log(data);
      this.booksArray = data.map(item => item.data as Book);
    });
  }

}
