import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../components/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService, private router: Router, private userService: UserService) {}

  saveData(data: {}): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('books')
        .add(data)
        .then((docRef) => {
          this.toastr.success('Book added!');
          resolve(docRef.id); 
        })
        .catch((err) => {
          console.log(err);
          reject(err); 
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

  addToWishlist(userId: string, bookId: string): Promise<void> {
    return this.afs.collection(`users/${userId}/wishlist`).doc(bookId).set({}).then(() => {
      this.toastr.success('Book added to wishlist');
    }).catch((error) => {
      console.error('Error adding book to wishlist:', error);
      this.toastr.error('Failed to add book to wishlist');
    });
  }
  

  getWishlist(userId: string): Observable<any[]> {
    return this.afs
      .collection(`users/${userId}/wishlist`)
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
      .doc(`books/${id}`) 
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
