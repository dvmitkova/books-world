import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "src/app/services/auth.guard";
import { MyBooksComponent } from "../layouts/my-books/my-books.component";
import { WishlistComponent } from "../layouts/wishlist/wishlist.component";
import { OrdersComponent } from "../layouts/orders/orders.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivateChild: [AuthGuard] },
    { path: 'profile/my-books', component: MyBooksComponent, canActivateChild: [AuthGuard] },
    { path: 'profile/wishlist', component: WishlistComponent, canActivateChild: [AuthGuard] },
    { path: 'profile/orders', component: OrdersComponent, canActivateChild: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }