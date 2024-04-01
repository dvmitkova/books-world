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

  booksArray!: any[];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.loadData().subscribe((data: any[]) => {
      console.log(data);
      this.booksArray = data.map(item => ({ id: item.id, data: item.data as Book }));
    });
  }
}
