import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent {
  title = '';
  author = '';
  publishedDate = '';

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {}

  onSubmit(): void {
    const newBook = {
      title: this.title,
      author: this.author,
      publishedDate: new Date(this.publishedDate).toISOString(),
    };

    this.bookService.createBook(newBook).subscribe({
      next: () => this.router.navigate(['/books']),
      error: (err) => console.error('Failed to create book', err),
    });
  }
}
