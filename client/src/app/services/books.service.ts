import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService, private router: Router) {}

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

  loadOneBookData(id: string) {
    return this.afs.collection('books').doc(id).valueChanges();
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

  updateData(bookId: string, bookData: any): Promise<void> {
    console.log(bookId, bookData);

    return new Promise((resolve, reject) => {
      this.afs
        .collection('books')
        .doc(bookId)
        .update(bookData)
        .then(() => {
          this.toastr.success('Book updated successfully');
          resolve();
        })
        .catch((error) => {
          console.error('Error updating book:', error);
          reject(error);
        });
    });
  }

  deleteData(id: string) {
    this.afs
      .doc(`books/${id}`) // Corrected collection path
      .delete()
      .then(() => {
        this.toastr.warning('Book Deleted!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        this.toastr.error('Failed to delete book');
      });
  }
}
