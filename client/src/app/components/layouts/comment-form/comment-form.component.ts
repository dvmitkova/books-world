import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup; // Declare commentForm property of type FormGroup
  isLoggedIn: boolean = false; // Flag to determine if the user is logged in

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Subscribe to the isLoggedIn observable in the UserService
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    // Initialize commentForm with FormBuilder
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required], // Add name form control with required validator
      comment: ['', Validators.required], // Add comment form control with required validator
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    const commentData = this.commentForm.value;
    // Add additional data if needed, such as book ID or timestamp

    // Add the comment data to the 'comments' collection in Firebase
    this.afs
      .collection('comments')
      .add(commentData)
      .then(() => {
        this.toastr.success('Comment added successfully');
        this.commentForm.reset(); // Reset the form after successful submission
      })
      .catch((error) => {
        console.error('Error adding comment: ', error);
        this.toastr.error('Failed to add comment');
      });
  }
}
