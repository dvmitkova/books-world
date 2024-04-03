import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
import { SingleBookSectionComponent } from './components/pages/single-book/single-book-section.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { PointsSystemComponent } from './components/pages/points-system/points-system.component';
import { OfferBookComponent } from './components/pages/offer-book/offer-book.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'book/:id', component: SingleBookSectionComponent },
  { path: 'offer-book', component: OfferBookComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'points-system', component: PointsSystemComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
