import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: {}): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('books')
        .add(data)
        .then((docRef) => {
          console.log(docRef.id);
          this.toastr.success('Book added!');
          resolve(docRef.id); // Resolve with the new book ID
        })
        .catch((err) => {
          console.log(err);
          reject(err); // Reject with the error
        });
    });
  }

  loadData() {
    return this.afs
      .collection('books')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getBookById(bookId: string) {
    return this.afs.collection('books').doc(bookId).valueChanges();
  }

  onEdit() {
    return this.afs
      .collection('books')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
