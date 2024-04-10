import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';


@Component({
  selector: 'app-all-books-section',
  templateUrl: './all-books-section.component.html',
  styleUrls: ['./all-books-section.component.css']
})
export class AllBooksSectionComponent implements OnInit {
  isLoading: boolean = true;
  booksArray!: any[];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      this.booksArray = data.map(item => ({ id: item.id, data: item.data as Book }));
      this.isLoading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.isLoading = false; // Set isLoading to false if there's an error
    }
    );
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

}
