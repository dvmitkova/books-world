import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
  @Input() bookId: string | null = null;
  comments: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    if (this.bookId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.firestore.collection('comments', ref => ref.where('bookId', '==', this.bookId)).valueChanges()
      .subscribe((comments: any[]) => {
        this.comments = comments;
      });
  }
}