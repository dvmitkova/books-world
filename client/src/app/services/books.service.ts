import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private afs: AngularFirestore) {}

  //!!! data: any
  saveData(data: {}) {
    this.afs
      .collection('books')
      .add(data)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
