import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
  @Input() bookId: string | null = null; // Input property to receive the book ID
  comments: any[] = []; // Array to store comments

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    if (this.bookId) {
      this.loadComments();
    }
  }

  loadComments() {
    // Fetch comments from Firestore based on the book ID
    this.firestore.collection('comments', ref => ref.where('bookId', '==', this.bookId)).valueChanges()
      .subscribe((comments: any[]) => {
        this.comments = comments;
      });
  }
}