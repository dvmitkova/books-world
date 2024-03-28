import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { UserModule } from './components/user/user.module';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
import { HowItWorksComponent } from './components/pages/how-it-works/how-it-works.component';
import { BookCardComponent } from './components/layouts/book-card/book-card.component';
import { SearchCardComponent } from './components/layouts/search-card/search-card.component';
import { AllBooksSectionComponent } from './components/layouts/all-books-section/all-books-section.component';
import { WishlistBooksSectionComponent } from './components/layouts/wishlist-books-section/wishlist-books-section.component';
import { RecentlyAddedSectionComponent } from './components/layouts/recently-added-section/recently-added-section.component';
import { SingleBookSectionComponent } from './components/pages/single-book/single-book-section.component';
import { CommentFormComponent } from './components/layouts/comment-form/comment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    NotFoundComponent,
    CatalogComponent,
    ContactsComponent,
    DeliveryComponent,
    HowItWorksComponent,
    BookCardComponent,
    SearchCardComponent,
    AllBooksSectionComponent,
    WishlistBooksSectionComponent,
    RecentlyAddedSectionComponent,
    SingleBookSectionComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CoreModule,
    SharedModule,
    FormsModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
