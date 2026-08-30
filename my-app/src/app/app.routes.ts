import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookFormComponent } from './components/book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
];
