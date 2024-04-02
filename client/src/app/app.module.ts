import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment.prod';

import { SlicePipe } from './shared/pipes/slice.pipe';

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
import { SearchCardComponent } from './components/layouts/search-card/search-card.component';
import { AllBooksSectionComponent } from './components/layouts/all-books-section/all-books-section.component';
import { RecentlyAddedSectionComponent } from './components/layouts/recently-added-section/recently-added-section.component';
import { SingleBookSectionComponent } from './components/pages/single-book/single-book-section.component';
import { OfferFormComponent } from './components/layouts/offer-form/offer-form.component';
import { SingleOfferComponent } from './components/layouts/single-offer/single-offer.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { PointsSystemComponent } from './components/pages/points-system/points-system.component';
import { OfferBookComponent } from './components/pages/offer-book/offer-book.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    NotFoundComponent,
    CatalogComponent,
    ContactsComponent,
    DeliveryComponent,
    SearchCardComponent,
    AllBooksSectionComponent,
    RecentlyAddedSectionComponent,
    SingleBookSectionComponent,
    OfferFormComponent,
    SingleOfferComponent,
    AboutUsComponent,
    PointsSystemComponent,
    OfferBookComponent,
    SlicePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
