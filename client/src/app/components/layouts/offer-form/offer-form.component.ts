import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/book';
import { UserService } from 'src/app/components/user/user.service'; // Import UserService

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  bookForm!: FormGroup;
  book: any;
  formStatus: string = 'Offer new';
  bookId: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.bookId = id;
        this.booksService.loadOneBookData(id).subscribe((book: any) => {
          this.book = book;
          this.bookForm.patchValue(book);
          this.formStatus = 'Edit';
        });
      }
    });

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      condition: [null, Validators.required],
      points: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pages: [''],
      image: [''],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid || !this.isLoggedIn) {
      return;
    }

    let userId: string | null = null;

    this.userService.getCurrentUserId().then((uid: string | null) => {
      userId = uid;
      if (!userId) {
        console.error('User ID not found.');
        return;
      }

      this.userService.getCurrentUserEmail().then((email: string | null) => {
        const userEmail = email;
        if (!userEmail) {
          console.error('User email not found.');
          return;
        }

        const imageValue = this.bookForm.value.image;

        const bookOfferData: Book = {
          name: this.bookForm.value.name,
          condition: this.bookForm.value.condition,
          points: this.bookForm.value.points,
          description: this.bookForm.value.description,
          pages: this.bookForm.value.pages || 0,
          author: this.bookForm.value.author,
          image: imageValue,
          addedBy: userEmail,
          added: '',
          wishlist: [],
          ordered: 0,
          userId: userId || '',
          id: '',
        };

        if (this.formStatus === 'Offer new') {
          this.booksService
            .saveData(bookOfferData)
            .then((newBookId: string) => {
              this.router.navigate(['/book', newBookId]);
            })
            .catch((error) => {
              console.error('Error saving book:', error);
            });
        } else if (this.formStatus === 'Edit') {

          if (this.formStatus === 'Edit' && this.bookId !== null) {
            const bookId = this.bookId; 
            this.booksService
              .updateData(bookId, bookOfferData)
              .then(() => {
                this.router.navigate(['/book', bookId]);
              })
              .catch((error) => {
                console.error('Error updating book:', error);
              });
          }
        }
      });
    });
  }
}