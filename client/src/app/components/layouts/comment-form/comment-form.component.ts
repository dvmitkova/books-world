import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UserService } from '../../user/user.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup; // Declare commentForm property of type FormGroup
  isLoggedIn: boolean = false; // Flag to determine if the user is logged in

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
        // Subscribe to the isLoggedIn observable in the UserService
        this.userService.isLoggedIn().subscribe(loggedIn => {
          this.isLoggedIn = loggedIn;
        });
    // Initialize commentForm with FormBuilder
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required], // Add name form control with required validator
      comment: ['', Validators.required] // Add comment form control with required validator
    });
  }

  onSubmit() {
    // Implement submit logic here
  }
}