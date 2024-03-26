import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isAuth = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      //implement logic
  }
}
