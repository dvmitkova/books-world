import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  imgSrc: any = '.././assets/img/placeholder-image.avif';
  selectedImg: any;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  onSubmit(formData: NgForm) {
    // if (formData.invalid) {
    //   return;
    // }

    const bookOfferData: Book = {
      name: formData.value.name,
      condition: formData.value.condition,
      points: formData.value.points,
      description: formData.value.description,
      added: formData.value.added,
      wishlist: formData.value.wishlist,
      ordered: formData.value.ordered,
      pages: formData.value.pages,
      author: formData.value.author,
      image: formData.value.image,
    };

    this.booksService.saveData(bookOfferData);

    formData.reset();
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];//to access the file
  }
}
