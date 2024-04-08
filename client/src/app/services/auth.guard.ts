// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { UserService } from '../components/user/user.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     if (this.userService.isLoggedInGuard) {
//       console.log('Access granted!');

//       return true;
//     } else {
//       this.toastr.warning('You dont have permission to access this page!')
//       this.router.navigate(['/auth/login'])
//       return false;
//     }
//   }
// }

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
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.isLoggedIn().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          console.log('Access granted!');
          return true;
        } else {
          this.toastr.warning('You do not have permission to access this page!');
          // Redirect the user to the login page
          return this.router.createUrlTree(['/auth/login']);
        }
      })
    );
  }
}
