import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;
  isLoggedIn: boolean = false; 
  bookId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
   
    this.userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
    });

   
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required], 
      comment: ['', Validators.required], 
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    const commentData = this.commentForm.value;

    commentData['bookId'] = this.bookId;

    this.afs
      .collection('comments')
      .add(commentData)
      .then(() => {
        this.toastr.success('Comment added successfully');
        this.commentForm.reset();
      })
      .catch((error) => {
        console.error('Error adding comment: ', error);
        this.toastr.error('Failed to add comment');
      });
  }
}
