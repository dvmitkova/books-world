import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void { }
  
  onSubmit(formValue: any) {
    this.userService.login(formValue.email, formValue.password);
  }
}
