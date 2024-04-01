import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}

  //   onSubmit(formData: any) {
  //     let offerData = {
  //       name: formData.value.offerName,
  //       condition: formData.value.condition,
  //       points: formData.value.points,
  //     }
  //     console.log(offerData);

  //   }
  // }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const offerData = {
      name: formData.value.bookName,
      condition: formData.value.condition,
      points: formData.value.points,
    };
    this.afs.collection('books').add(offerData).then(docRef => {
      console.log(docRef);
    }).catch(err => {console.log(err)
    })
  }
}
