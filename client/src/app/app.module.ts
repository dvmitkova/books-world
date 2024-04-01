import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { UserModule } from './components/user/user.module';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
import { BookCardComponent } from './components/layouts/book-card/book-card.component';
import { SearchCardComponent } from './components/layouts/search-card/search-card.component';
import { AllBooksSectionComponent } from './components/layouts/all-books-section/all-books-section.component';
import { WishlistBooksSectionComponent } from './components/layouts/wishlist-books-section/wishlist-books-section.component';
import { RecentlyAddedSectionComponent } from './components/layouts/recently-added-section/recently-added-section.component';
import { SingleBookSectionComponent } from './components/pages/single-book/single-book-section.component';
import { OfferFormComponent } from './components/layouts/offer-form/offer-form.component';
import { SingleOfferComponent } from './components/layouts/single-offer/single-offer.component';
import { OffersListSectionComponent } from './components/layouts/offers-list-section/offers-list-section.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { PointsSystemComponent } from './components/pages/points-system/points-system.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    NotFoundComponent,
    CatalogComponent,
    ContactsComponent,
    DeliveryComponent,
    BookCardComponent,
    SearchCardComponent,
    AllBooksSectionComponent,
    WishlistBooksSectionComponent,
    RecentlyAddedSectionComponent,
    SingleBookSectionComponent,
    OfferFormComponent,
    OffersListSectionComponent,
    SingleOfferComponent,
    AboutUsComponent,
    PointsSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    UserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
