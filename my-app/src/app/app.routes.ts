import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
];
