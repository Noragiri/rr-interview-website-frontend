import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faImage } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth';
import { LanguageService } from '../../services/language';
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
  faImage = faImage;
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    public languageService: LanguageService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error(this.languageService.t('failedToLoadBooks'), err),
    });
  }
  onDelete(id: number): void {
    if (!confirm(this.languageService.t('confirmDeleteBook'))) {
      return;
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter((b) => b.id !== id);
      },
      error: (err) => console.error(this.languageService.t('failedToDeleteBook'), err),
    });
  }
}
