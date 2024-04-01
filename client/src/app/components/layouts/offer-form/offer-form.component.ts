import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {

  }

  onSubmit(formData: any) {
    let offerData = {
      name: formData.value.offerName,
      condition: formData.value.condition,
      points: formData.value.points,
    }
    console.log(offerData);
    
  }
}
