import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookFormComponent } from './components/book-form/book-form';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { QuoteListComponent } from './components/quote-list/quote-list';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quotes', component: QuoteListComponent },
];
