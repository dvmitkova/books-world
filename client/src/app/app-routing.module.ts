import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
import { HowItWorksComponent } from './components/pages/how-it-works/how-it-works.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'about', component: HowItWorksComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'auth', loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
