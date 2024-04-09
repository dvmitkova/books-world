import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-recently-added-books',
  templateUrl: './recently-added-books.component.html',
  styleUrls: ['./recently-added-books.component.css']
})
export class RecentlyAddedBooksComponent implements OnInit {

  booksArray!: any[];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      this.booksArray = data.map(item => ({ id: item.id, data: item.data as Book }));
    });
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }
}