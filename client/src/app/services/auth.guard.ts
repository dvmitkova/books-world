import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../components/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.userService.isLoggedInGuard) {
      console.log('Access granted!');
      return true;
    } else {
      this.toastr.warning('Please login to access this page!');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
