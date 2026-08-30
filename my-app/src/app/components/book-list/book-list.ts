import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [DatePipe, RouterLink, FontAwesomeModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to load books', err),
    });
  }
}
