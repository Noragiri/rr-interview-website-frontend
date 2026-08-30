import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  faTrash = faTrash;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to load books', err),
    });
  }
  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter((b) => b.id !== id);
      },
      error: (err) => console.error('Failed to delete book', err),
    });
  }
}
