import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-recently-added-section',
  templateUrl: './recently-added-section.component.html',
  styleUrls: ['./recently-added-section.component.css']
})
export class RecentlyAddedSectionComponent implements OnInit {
  isLoading: boolean = true;
  booksArray: any[] = [];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      this.booksArray = data.map(item => ({ id: item.id, data: item.data as Book }));
      // Sort the books array by the added date in descending order
      this.booksArray.sort((a, b) => b.data.added.toDate().getTime() - a.data.added.toDate().getTime());
      // Slice the array to get only the first three items
      this.booksArray = this.booksArray.slice(0, 3);
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